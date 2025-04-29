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
		      <label htmlFor="username" className="block text-md/6 font-normal text-white">
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
			              focus:-outline-offset-2 focus:outline-cyan-500 sm:text-sm/6`}
	    		      aria-label="Username"
	    		      required
		        />
	        </div>
	      </div>
	      <div>
	    	  <div className="flex items-center justify-between">
		        <label 
              htmlFor="password" 
              className="block text-md/6 font-normal text-gray-900"
            >
	    	        Password
	          </label> 
		        <div className="text-sm">
	    	      <a 
                href="#" 
                className="font-semibold text-cyan-900 hover:text-cyan-500"
              >
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
			              focus:-outline-offset-2 focus:outline-cyan-500 sm:text-sm/6`}
	    		      aria-label="Password"
	    		      required
		        />
	   	    </div>
	      </div>
	    <div>
        <button 
          className={`bg-cyan-950 hover:bg-cyan-900 text-white font-normal 
                      px-6 py-2 rounded w-full tracking-wide`}
        >
          Sign in
        </button>
	    </div>
	</form>
  );
}

export default LoginForm
