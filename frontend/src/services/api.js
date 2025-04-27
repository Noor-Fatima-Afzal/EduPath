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
