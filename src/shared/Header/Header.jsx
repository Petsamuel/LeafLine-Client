/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useState, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearToken } from "../../utils/Token";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";
import CartCounter from "../../components/Cart/CartCounter";
import SearchResults from "../../components/Book/Search/SearchResults";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;
  const validToken = window.localStorage.getItem("userInfo");
  const isLoggedIn = !!validToken;

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  function logout() {
    fetch(`${apiBaseDomain}/users/logout`, {
      method: "POST",
    }).then(() => {
      clearToken();
      navigate("/signin");
    });
  }

  return (
    <header>
      <nav className="">
        <div className="relative flex justify-between mx-auto p-4  items-center ">
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn3d.iconscout.com/3d/free/thumb/free-book-4573596-3802605.png"
              className="h-8 mr-2 "
              alt="LeafLine Logo"
            />
            <span className="self-center lg:text-3xl md:text-3xl font-extrabold whitespace-nowrap text-md ">
              LeafLine
            </span>
          </Link>
          <div className="flex items-center ">
            {/* icons and menu*/}
            {isLoggedIn && (
              <>
                <div className=" relative lg:text-3xl text-md">
                  <Link to="/cart" className="relative ">
                    <CartCounter />
                  </Link>
                </div>
                {/* Notifications icon */}
                <div className="lg:text-2xl text-md">
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={`${
                            open ? "text-gray-900" : "text-gray-500"
                          } group bg-white rounded-full p-2 focus:outline-none`}
                        >
                          <FontAwesomeIcon
                            icon={faBell}
                            className="text-black"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Popover.Panel className="absolute z-10 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-48">
                            <div className="py-1 px-4">
                              {/* Content of your notifications */}
                              <p className="text-sm text-gray-700">
                                No notifications
                              </p>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={`${
                          open ? "text-gray-900" : "text-gray-500"
                        } group bg-white rounded-full px-3 py-2 inline-flex items-center text-base font-medium focus:outline-none`}
                      >
                        <img
                          className="w-8 h-8 rounded-full mr-2"
                          src="https://avatars.githubusercontent.com/u/62835101?v=4"
                          alt="user photo"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Popover.Panel className="absolute z-10 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-48">
                          <div className="py-1">
                            <Link
                              to="/profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Profile
                            </Link>
                            <Link
                              to="/order"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              My Orders
                            </Link>
                            <Link
                              to="/wishlists"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              My Wishlist
                            </Link>

                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Checkout
                            </a>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Settings
                            </a>
                            <Link
                              to={"/patron"}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Become a Patron
                            </Link>
                            <button
                              onClick={logout}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Sign out
                            </button>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </>
            )}
            {/* end of iconicons and profile */}
            {/* menu- icon */}
            <div className="relative flex cursor-pointer lg:hidden md:hidden z-50">
              <FontAwesomeIcon
                icon={faBars}
                onClick={() => {
                  setMenu(!menu);
                }}
              />
            </div>
            {/* end menu icon */}
            <div className={`${menu ? " " : ""} `}>
              {/*  login and signin icon */}
              {!isLoggedIn && (
                <>
                  <div
                    className={`${
                      menu
                        ? "flex flex-col lg:flex-row absolute lg:block right-0 top-0 py-20 my-5 z-40 h-screen w-1/2 bg-white"
                        : "hidden lg:flex "
                    } `}
                  >
                    <Link
                      to="/signup"
                      className="ring-2 ring-rose-[#4e9fe9] hover:bg-[#4e9fe9] transition-all ease-in-out m-2 py-2 px-4 rounded-md duration-200 border-b border-gray-100  text-black hide-on-small-screen"
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/signin"
                      className=" ring-2 ring-rose-[#4e9fe9] hover:bg-[#4e9fe9] transition-all ease-in-out  m-2 py-2 px-4 rounded-md duration-200 border-b border-gray-100  text-black hide-on-small-screen"
                    >
                      Sign In
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex max-w-full">
          {/* search bar */}
          {location.pathname === "/" && (
            <div className="relative my-4 flex w-full">
              <input
                type="text"
                placeholder="Search for books, authors..."
                className=" p-4 lg:p-6 mx-4 w-full bg-gray-200 border border-gray-300 rounded-full  focus:outline-none focus:bg-white text-black "
                value={searchTerm}
                onChange={handleChange}
              />
              <div className="absolute z-10 w-full py-6 my-10">
                <SearchResults searchTerm={searchTerm} />
              </div>
            </div>
          )}
        </div>
        {/* ^_^ end of search-bar */}
      </nav>
    </header>
  );
};

Header.propTypes = {
  setSearchResults: PropTypes.func.isRequired,
};

export default Header;
