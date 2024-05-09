import { CiSearch } from "react-icons/ci";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { user } = useSelector((state) => state.user);
    const { currentUser } = user;
  return (
    <header className="shadow-lg flex items-center py-3 px-5 justify-between">
      <div>
        <h1 className="flex items-center gap-x-1">
          <span>
            <MdOutlineRealEstateAgent size={25} />
          </span>
          <span className="font-bold tracking-wider">Estate</span>
        </h1>
      </div>
      <div>
        <form className="relative">
          <input
            className="border py-1 px-4 rounded-md"
            type="text"
            placeholder="Search..."
          />
          <span className="absolute right-1 top-1">
            <CiSearch size={25} />
          </span>
        </form>
      </div>
      <nav>
        <ul className="flex items-center gap-x-5">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            {currentUser ? (
              <NavLink to="/profile">
                <img
                  className="w-8 h-8 object-cover rounded-md cursor-pointer"
                  src={currentUser?.rest.avatar}
                  alt="profile"
                />
              </NavLink>
            ) : (
              <NavLink to="/sign-in">Sign in</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
