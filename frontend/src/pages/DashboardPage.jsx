import { useNavigate } from "react-router-dom";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import pfp from "../assets/images/generic_pfp.png"
import { useState } from "react";
import logo from "../assets/images/edu_path_logo.png";
import InstituteForm from "../components/forms/InstituteForm.jsx";
import axios from "axios";

function DashboardPage() {
  const [costLivingIdx, setCostLivingIdx] = useState(null)
  const [monthlyRent, setMonthlyRent] = useState(null)

  const navigate = useNavigate();
  
  const handleCostLivingIdxChange = (evt) => {
    setCostLivingIdx(evt.target.value)
  }

  const handleMonthlyRentChange = (evt) => {
    setMonthlyRent(evt.target.value)
  }

  // Institute preferences form submit
  const handleInstitutePreferencesSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const payload = {
        "Cost of Living Index": parseInt(costLivingIdx),
        "Monthly rent price": parseInt(monthlyRent),
        "OCC_TITLE_y": "Software Developer",
        "Salary": 90000
      }
      
      const response = await axios.post("http://127.0.0.1:5000/relocation_recommend", payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        })
      console.log(`Recommendations: ${response.data}`)
    } catch (err) {
      console.error("Error fetching relocation recommendations:", err)
    }
  }

  const handleSignout = () => {
    localStorage.removeItem("token")
    navigate("/", { replace: true })
  }

  return (
    <div>
      <Disclosure as="nav" className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex shrink-0 items-center pt-1.5">
                <img
                  alt="EduPath Logo"
                  src={logo}
                  className="h-24 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  href="#"
                  className={`inline-flex items-center border-b-2 border-indigo-500 
                              px-1 pt-1 text-sm font-medium text-gray-900`}
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className={`inline-flex items-center border-b-2 border-transparent 
                              px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 
                              hover:text-gray-700`}
                >
                  Preferences
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className={`relative flex rounded-full bg-white text-sm focus:ring-2 
                      focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden`}>
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src={pfp}
                      className="size-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 
                            shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95
                            data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out
                            data-enter:ease-out data-leave:duration-75 data-leave:ease-in`}
                >
                  <MenuItem>
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 
                                data-focus:outline-hidden`}
                    >
                      Your Profile
                    </a>
                  </MenuItem> 
                  <MenuItem>
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 
                                  data-focus:outline-hidden`}
                    >
                      Settings 
                    </a>
                  </MenuItem> 
                  <MenuItem>
                    <button
                      className={`block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 
                          data-focus:outline-hidden`}
                      onClick={handleSignout}
                    >
                      Sign out 
                    </button>
                  </MenuItem> 
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </Disclosure>  
      <InstituteForm 
        costLivingIdx={costLivingIdx}
        monthlyRent={monthlyRent}
        handleCostLivingIdxChange={handleCostLivingIdxChange}
        handleMonthlyRentChange={handleMonthlyRentChange}
        handleInstitutePreferencesSubmit={handleInstitutePreferencesSubmit} 
      />
    </div>
  )
}

export default DashboardPage;
