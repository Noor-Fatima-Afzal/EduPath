import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/20/solid'

export default function Alert({ alertType, alertMessage }) {
    const alertColor = alertType == "error" ? "red" : "green"
    return (
      <div className={`rounded-md p-4 ${alertType === "error" ? "bg-red-50" : "bg-green-50"}`}>
  	    <div className="flex">
    		  <div className="shrink-0">
      		    {alertType === "error" ? (
        		    <XCircleIcon className="size-5 text-red-400" aria-hidden="true" />
      		     ) : (
        		    <CheckCircleIcon className="size-5 text-green-400" aria-hidden="true" />
      		     )}
    		  </div>
    	    <div className="ml-3">
      	    	<h3 
	    	        className={`text-sm font-medium ${alertType === "error" 
				            ? "text-red-800" : "text-green-800"}`}
	            >
        	        {alertMessage}
      	      </h3>
    	    </div>
        </div>
      </div>
    )
}
