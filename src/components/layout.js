import * as React from "react"
import { Link } from "gatsby"
import Menu from "./menu"

const Layout = ({ location, title, des, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header
  if (isRootPath) {
    header = (
      <>
        <div className="w-full text-center my-4">
          <h1 className="text-4xl font-bold  text-gray-600">{title}</h1>
          <div className="text-sm text-gray-600 m-4">{des}</div>
          <hr className="my-4 mx-auto w-48 h-1 bg-gray-100 rounded border-0" />
        </div>
        <Menu />
      </>
    ) 
  } else {
    header = (
      <>
        <div className="w-full text-center my-4">
          <Link className="text-4xl font-bold text-gray-600" to="/">
            {title}
          </Link>
          <div className="text-sm text-gray-600 m-4">{des}</div>
          <hr className="my-4 mx-auto w-48 h-1 bg-gray-100 rounded border-0" />
        </div>
        <Menu />
      </>
    )
  }

  return (
    <div
      className="max-w-2xl mx-auto bg-white shadow-sm"
      data-is-root-path={isRootPath}
    >
      <header className="pt-4">{header}</header>
      <main>{children}</main>
      <hr className="mt-5 mx-auto w-48 h-1 bg-gray-100 rounded border-0" />
      <footer className="p-3">
        <div className="w-full text-center text-base text-gray-700">
          &copy; {new Date().getFullYear()} {title}
        </div>
      </footer>
    </div>
  )
}

export default Layout
