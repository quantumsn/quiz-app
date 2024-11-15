import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="shadow sticky top-0 z-20">
      <nav className="bg-white border-gray-200 px-4 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/">
            <h3 className="text-orange-700 text-xl font-bold">Quizentum</h3>
          </Link>
          <div className="flex justify-center gap-8 font-medium text-gray-600">
            <p>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? "text-orange-700" : "text-gray-600"}
                  hover:text-orange-700 inline-block`
                }
              >
                Home
              </NavLink>
            </p>
            <NavLink
              to="/quiz/new"
              className={({ isActive }) =>
                isActive ? "text-orange-700" : "text-gray-600"
              }
            >
              <p className="inline-block hover:text-orange-700 cursor-pointer">
                New Quiz
              </p>
            </NavLink>
            <NavLink
              to="/quiz"
              end
              className={({ isActive }) =>
                isActive ? "text-orange-700" : "text-gray-600"
              }
            >
              <p className="inline-block hover:text-orange-700 cursor-pointer">
                Quiz
              </p>
            </NavLink>
          </div>
          <div className="flex justify-center items-center gap-4 font-medium">
            <p className=" inline-block">Login</p>
            <p className="inline-block bg-orange-700 px-4 py-2.5 text-white rounded-lg">
              Get Started
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
}
