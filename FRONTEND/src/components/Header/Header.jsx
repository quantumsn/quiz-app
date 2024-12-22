import { NavLink, Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../contexts/AuthProvidor";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const handleLogout = async () => {
    const url = import.meta.env.VITE_BACKEND_API_URL;
    try {
      let response = await fetch(`${url}/user/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Logout Error:", errorData.message);
      } else {
        let message = await response.json();
        logout();
        console.log(message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <header className="shadow sticky top-0 z-20">
      <nav className="bg-white border-gray-200 px-4 py-2.5">
        <div className="flex flex-wrap justify-around items-center max-w-screen">
          <Link to="/">
            <h3 className="text-orange-700 text-2xl font-bold">Quizentum</h3>
          </Link>
          <div className="flex md:order-none order-last justify-center md:gap-8 gap-4 font-medium text-gray-600">
            <NavLink
              to="/quiz/new"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-orange-700 bg-orange-100 rounded-lg"
                    : "text-white bg-orange-700 rounded-lg"
                } flex p-4`
              }
            >
              <AddIcon />
              <p className="ml-2">Create Quiz</p>
            </NavLink>

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-orange-700 bg-orange-100 rounded-lg"
                    : "text-white bg-orange-700 rounded-lg"
                } flex p-4`
              }
            >
              <FormatListBulletedIcon />
              <p className="ml-2">My Quizzes</p>
            </NavLink>
          </div>
          {isAuthenticated && (
            <div
              onClick={handleLogout}
              className="flex justify-center items-center gap-4 font-medium text-gray-800 hover:text-orange-700 cursor-pointer"
            >
              <div className="flex p-4">
                <LogoutIcon />
                <p className="ml-2">Logout</p>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
