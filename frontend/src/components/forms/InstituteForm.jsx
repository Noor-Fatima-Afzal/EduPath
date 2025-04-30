// {
//   "Cost of Living Index": 110,
//   "Monthly rent price": 1600,
//   "OCC_TITLE_y": "Software Developer",
//   "Salary": 90000
// }
export default function InstituteForm({
  costLivingIdx,
  monthlyRent,
  handleCostLivingIdxChange,
  handleMonthlyRentChange,
  handleInstitutePreferencesSubmit
}) { 
  return (
    <form
      action="#"
      method="POST"
      className="space-y-6"
      onSubmit={handleInstitutePreferencesSubmit}
    >
      <div>
        <label htmlFor="costLivingIdx" className="block text-md/6 font-normal text-white">
          Cost of Living Index
        </label>
        <div className="mt-2">
          <input
              id="costLivingIdx" 
              name="costLivingIdx"
              type="number" 
              value={costLivingIdx || ""}
              onChange={handleCostLivingIdxChange}
              className={`block w-full rounded-t-md bg-white px-3 py-1.5 text-base 
                  text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 
                  placeholder:text-gray-400 focus:relative focus-outline-2 focus:outline-2 
                  focus:-outline-offset-2 focus:outline-cyan-500 sm:text-sm/6`}
              aria-label="Cost of Living Index"
              required
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label 
            htmlFor="monthlyRent" 
            className="block text-md/6 font-normal text-gray-900"
          >
              Monthly Rent Price
          </label> 
        </div>
        <div className="mt-2">
          <input 
              id="monthlyRent" 
              name="monthlyRent"
              type="monthlyRent" 
              value={monthlyRent || ""}
              onChange={handleMonthlyRentChange}
              className={`block w-full rounded-md bg-white px-3 py-1.5 text-base 
                  text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 
                  placeholder:text-gray-400 focus:outline focus:outline-2 
                  focus:-outline-offset-2 focus:outline-cyan-500 sm:text-sm/6`}
              aria-label="Monthly Rent"
              required
          />
        </div>
      </div>
      <div>
        <button
          className={`bg-cyan-950 hover:bg-cyan-900 text-white font-normal 
                      px-6 py-2 rounded w-full tracking-wide`}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
