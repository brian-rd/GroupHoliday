import { NavLink } from "react-router";

const navigation = [
    { name: "Home", path: "/" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
  ];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  return (
    <div className="relative flex items-center justify-center h-16 px-2 mx-auto shadow sm:px-6 lg:px-8">
        <div className="flex space-x-4">
            {navigation.map((item) => (
                <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                    `px-3 py-5 text-sm font-medium border-b-2   ${
                    isActive ? "border-indigo-500 text-gray-900" : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                    }`
                }
                >
                {item.name}
                </NavLink>
            ))}
        </div>
    </div>
  )
}
