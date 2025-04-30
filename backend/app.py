from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pandas as pd
from dotenv import load_dotenv
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.neighbors import NearestNeighbors
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from langchain_groq import ChatGroq
from langchain_community.document_loaders import UnstructuredWordDocumentLoader, DirectoryLoader
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains import create_retrieval_chain, create_history_aware_retriever
from langchain.vectorstores import Chroma
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.messages import AIMessage, HumanMessage

# Logging
print("[DEBUG] Starting EduPath backend server...")

# Load environment variables
load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")
hf_token = os.getenv("HF_TOKEN")

app = Flask(__name__)
CORS(app, resources={r"/*", {"origins": "http://localhost*"}})

print("[DEBUG] About to initialize ChatGroq...")
# ---------------- RAG SETUP ----------------
llm = ChatGroq(groq_api_key=groq_api_key, model_name="Llama3-8b-8192")

print("[DEBUG] llm initialized...")

# Load DOCX files
loader = DirectoryLoader("data", glob="**/*.docx", loader_cls=UnstructuredWordDocumentLoader)
docs = loader.load()

print("[DEBUG] Loading .docx files from data directory...")

# Split and embed documents
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
splits = text_splitter.split_documents(docs)

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

persist_dir = "chroma_db"

if os.path.exists(persist_dir):
    print("[DEBUG] Loading persisted vectorstore...")
    vectorstore = Chroma(persist_directory=persist_dir, embedding_function=embeddings)
else:
    print("[DEBUG] Building vecotrstore from documents...")
    vectorstore = Chroma.from_documents(docs, embeddings, persist_directory=persist_dir)
    vectorstore.persist()

retriever = vectorstore.as_retriever()

print("[DEBUG] Chroma load complete.")

# System prompt for QA
system_prompt = (
    "You are an assistant for question-answering tasks. "
    "Use the following pieces of retrieved context to answer "
    "the question. If you don't know the answer, say that you "
    "don't know. Use three sentences maximum and keep the "
    "answer concise.\n\n{context}"
)

# Chat prompts and chains
contextualize_q_prompt = ChatPromptTemplate.from_messages([
    ("system", "Given a chat history and the latest user question "
               "which might reference context in the chat history, "
               "formulate a standalone question which can be understood "
               "without the chat history. Do NOT answer the question, "
               "just reformulate it if needed and otherwise return it as is."),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])
qa_prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])
history_aware_retriever = create_history_aware_retriever(llm, retriever, contextualize_q_prompt)
question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)
chat_history = []

# ---------------- INSTITUTE RECOMMENDATION ----------------
df_institute = pd.read_csv('institutes_data.csv')
feature_cols_institute = ['Fees', 'Students', 'POPULATION', 'PT_ENROLL', 'FT_ENROLL',
                          'TOT_ENROLL', 'HOUSING', 'DORM_CAP', 'TOT_EMP']
df_selected_institute = df_institute[feature_cols_institute].fillna(0)
scaler_institute = StandardScaler()
scaled_data_institute = scaler_institute.fit_transform(df_selected_institute)
knn_institute = NearestNeighbors(n_neighbors=5, metric='euclidean')
knn_institute.fit(scaled_data_institute)

# ---------------- RELOCATION RECOMMENDATION ----------------
df_relocation = pd.read_csv('relocation_data.csv')
df_relocation = df_relocation[['City', 'State', 'Cost of Living Index', 'Monthly rent price', 'OCC_TITLE_y', 'Salary']].dropna()
feature_cols_relocation = ['Cost of Living Index', 'Monthly rent price', 'OCC_TITLE_y', 'Salary']
X_relocation = df_relocation[feature_cols_relocation]
preprocessor_relocation = ColumnTransformer(transformers=[
    ('num', StandardScaler(), ['Cost of Living Index', 'Monthly rent price', 'Salary']),
    ('cat', OneHotEncoder(handle_unknown='ignore'), ['OCC_TITLE_y'])
])
pipeline_relocation = Pipeline([
    ('preprocessor', preprocessor_relocation),
    ('knn', NearestNeighbors(n_neighbors=5, metric='euclidean'))
])
pipeline_relocation.fit(X_relocation)

# ---------------- ROUTES ----------------

@app.route('/')
def home():
    return "Unified Flask API with LangChain RAG, Institute & Relocation Recommendations"

@app.route('/ask', methods=['POST'])
def ask_question():
    try:
        data = request.json
        question = data.get("question")
        if not question:
            return jsonify({"error": "No question provided"}), 400

        # Chat with history
        response = rag_chain.invoke({"input": question, "chat_history": chat_history})
        chat_history.extend([
            HumanMessage(content=question),
            AIMessage(content=response["answer"])
        ])
        return jsonify({"answer": response["answer"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/institute_recommend', methods=['POST'])
def recommend_institute():
    try:
        user_input = request.json
        missing = [col for col in feature_cols_institute if col not in user_input]
        if missing:
            return jsonify({"error": f"Missing fields: {missing}"}), 400
        user_df = pd.DataFrame([user_input])
        user_scaled = scaler_institute.transform(user_df)
        _, indices = knn_institute.kneighbors(user_scaled)
        recommended = df_institute.iloc[indices[0]]
        results = recommended[['NAME', 'CITY', 'STATE', 'Fees', 'TOT_ENROLL']].to_dict(orient='records')
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/relocation_recommend', methods=['POST'])
def recommend_relocation():
    try:
        user_input = request.json
        missing = [col for col in feature_cols_relocation if col not in user_input]
        if missing:
            return jsonify({"error": f"Missing fields: {missing}"}), 400
        user_df = pd.DataFrame([user_input])
        user_scaled = pipeline_relocation.named_steps['preprocessor'].transform(user_df)
        _, indices = pipeline_relocation.named_steps['knn'].kneighbors(user_scaled)
        recommended = df_relocation.iloc[indices[0]]
        results = recommended[['City', 'State', 'Cost of Living Index', 'Monthly rent price', 'OCC_TITLE_y', 'Salary']].to_dict(orient='records')
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
