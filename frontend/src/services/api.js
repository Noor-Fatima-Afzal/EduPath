import axios from "axios";

// testing locally
const API_BASE = "http://localhost:5000";

export const getInstituteRecommendations = (formData) => {
  axios.post(`${API_BASE}/institute_recommend`, formData);
}

export const getRelocationRecommendatoions = (formData) => {
  axios.post(`${API_BASE}/relocation_recommend`, formData);
}

export async function mockLogin(username, password) {
    // Delay simulation
    await new Promise(resolve => setTimeout(resolve, 500));
 	
    // Mock user database
    const mockUser = {
	    username: "admin",
	    password: "secret",
    };

    if (username == mockUser.username && password == mockUser.password) {
	    return { success: true, token: "mock-token-12345" };
    } else {
	    throw new Error("Invalid credentials");
    }
}
