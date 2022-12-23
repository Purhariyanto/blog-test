import * as React from "react"
import { Link } from "gatsby"
import AdsTop from "./ads-top"

const Menu = () => {
  return (
    <>
      <div className="w-full flex justify-center gap-4 my-6">
        <div className="bg-gray-700 p-2 shadow-md rounded-xl hover:bg-yellow-600">
          <Link className="text-sm font-bold text-white" to="/tags/android/">
            Android
          </Link>
        </div>
        <div className="bg-gray-700 p-2 shadow-md rounded-xl hover:bg-yellow-600">
          <Link className="text-sm font-bold text-white" to="/tags/linux/">
            Linux
          </Link>
        </div>
        <div className="bg-gray-700 p-2 shadow-md rounded-xl hover:bg-yellow-600">
          <Link className="text-sm font-bold text-white" to="/tags/windows/">
            Windows
          </Link>
        </div>
      </div>
      <AdsTop />
    </>
  )
}

export default Menu
