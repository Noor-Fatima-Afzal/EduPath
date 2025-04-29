import { useState, useEffect } from "react"
import LoginForm from "../components/LoginForm.jsx"
import Alert from "../components/Alert.jsx"
import { useNavigate } from "react-router-dom"
import { mockLogin } from "../services/api"
import logo from "../assets/images/edu_path_logo.png"

function LoginPage() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [toast, setToast] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    // Notification for login attempt
    const showToast = (type, message) => {
	    setToast({ type, message })
	    // Temporary notification
	    window.setTimeout(() => {
	      setToast(null);
	    }, 3000); // 3-sec duration
    } 

    // Updates username entry
    const handleUserNameChange = (evt) => {
        setUserName(evt.target.value)
    }
    
    // Updates password entry
    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }
	
    // Submits form, triggers toast notification
    const handleFormSubmit = async (evt) => {
      evt.preventDefault()
      setLoading(true) // TODO Loading state flag
      // Handle successfull vs. failed login    
        try {
          const result = await mockLogin(userName, password);
          showToast("success", "Login successful!");
          localStorage.setItem('token', result.token);
          navigate("/dashboard", { replace: true }); // prevents back-nav
        } catch (err) {
            showToast("error", err.message || "Login failed!");
        } finally {
            setLoading(false);
        }
    }

    return (
	    <>
        {toast && (
          <Alert alertType={toast.type} alertMessage={toast.message} />
        )}
        <div className={`flex min-h-full flex-1 flex-col justify-center 
                      py-12 sm:px-6 lg:px-8`}>
            <img
              alt="< EduPath logo >"
              src={logo}
              className="mx-auto h-105 w-auto"
            />
          <h2 className={`mt-6 text-center text-3xl/7 font-semibold tracking-tight 
                          text-pink-300`}>
            Sign into your account
          </h2>
        </div>
	      {/* Login Form */}
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <LoginForm 
                userName={userName} 
                passwd={password}
                handleUserNameChange={handleUserNameChange}
                handlePasswordChange={handlePasswordChange}
                handleFormSubmit={handleFormSubmit}
	    	      />
             <p className="mt-10 text-center text-sm/6 text-gray-500">
                Not a member? &nbsp;
                <a href="#" className={`font-semibold text-cyan-900 
                                          hover:text-cyan-500`}>
                    Start a 14-day trial
                </a>
             </p>
	    	  </div>
	      </div>
	    </>
    );
}

export default LoginPage;
