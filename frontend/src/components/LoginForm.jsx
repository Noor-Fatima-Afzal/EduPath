function LoginForm(
	{
	    userName, 
 	    passwd, 
	    handleUserNameChange,
	    handlePasswordChange,
 	    handleFormSubmit
	}) {

    return (
    	<form 
	    action="#" 
	    method="POST" 
	    className="space-y-6" 
	    onSubmit={handleFormSubmit}
	>
	    <div>
		<label htmlFor="username" className="block text-sm/6 font-medium text-white">
	    	    Username
	        </label>
	    	<div className="mt-2">
	    	    <input 
	    	        id="username" 
	                name="username"
	    	        type="text" 
	    	        value={userName || ""}
	    	        onChange={handleUserNameChange}
	    	        className={`block w-full rounded-t-md bg-white px-3 py-1.5 text-base 
	    		   text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 
			   placeholder:text-gray-400 focus:relative focus-outline-2 focus:outline-2 
			   focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
	    		aria-label="Username"
	    		required
		    />
	        </div>
	    </div>
	    <div>
	    	<div className="flex items-center justify-between">
		    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
	    	        Password
	            </label> 
		<div className="text-sm">
	    	    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
	    		Forgot password?
	    	    </a>
	 	</div>
	    </div>
	    	<div className="mt-2">
	    	    <input 
	    	        id="password" 
	                name="password"
	    	        type="password" 
	    	        value={passwd || ""}
	    	        onChange={handlePasswordChange}
	    	        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base 
	    		   text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 
			   placeholder:text-gray-400 focus:outline focus:outline-2 
			   focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
	    		aria-label="Password"
	    		required
		    />
	   	</div>
	    </div>
	    <div>
	    	<button 
	    	    type="submit"
	    	    className={`flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5
		    	text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
			focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
	    	>
		    Sign in
	    	</button>
	    </div>
	</form>
    );
}

export default LoginForm
