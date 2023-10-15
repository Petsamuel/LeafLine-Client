/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useState, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearToken } from '../../utils/Token';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import CartCounter from '../../components/Cart/CartCounter';
import SearchResults from '../../components/Book/Search/SearchResults';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const apiBaseDomain = import.meta.env.VITE_API_BASE_URL;
  const validToken = window.localStorage.getItem('userInfo');
  const isLoggedIn = !!validToken;

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  function logout() {
    fetch(`${apiBaseDomain}/users/logout`, {
      method: 'POST',
    }).then(() => {
      clearToken();
      navigate('/signin');
    });
  }

  return (
    <header>
      <nav className='bg-white border-gray-200'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Link to='/' className='flex items-center'>
            <img
              src='https://cdn3d.iconscout.com/3d/free/thumb/free-book-4573596-3802605.png'
              className='h-8 mr-3'
              alt='LeafLine Logo'
            />
            <span className='self-center text-3xl font-extrabold whitespace-nowrap'>
              LeafLine
            </span>
          </Link>

          {/* Search Bar */}
          {location.pathname === '/' && (
            <div>
              <input
                type='text'
                placeholder='Search for books, authors...'
                className='w-1/2 md:w-64 bg-gray-200 border border-gray-300 rounded-full pl-6 pr-4 py-2 focus:outline-none focus:bg-white text-black ml-4'
                value={searchTerm}
                onChange={handleChange}
              />
              <SearchResults searchTerm={searchTerm} />
            </div>
          )}

          <div className='flex items-center md:order-2'>
            {isLoggedIn && (
              <>
                <div className='text-3xl'>
                  <Link to='/cart' className='relative'>
                    <CartCounter />
                  </Link>
                </div>
                {/* Notifications icon */}
                <div className='text-2xl'>
                  <Popover className='relative'>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={`${
                            open ? 'text-gray-900' : 'text-gray-500'
                          } group bg-white rounded-full p-2 focus:outline-none`}
                        >
                          <FontAwesomeIcon
                            icon={faBell}
                            className='text-black'
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <Popover.Panel className='absolute z-10 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-48'>
                            <div className='py-1 px-4'>
                              {/* Content of your notifications */}
                              <p className='text-sm text-gray-700'>
                                No notifications
                              </p>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
                <Popover className='relative'>
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={`${
                          open ? 'text-gray-900' : 'text-gray-500'
                        } group bg-white rounded-full px-3 py-2 inline-flex items-center text-base font-medium focus:outline-none`}
                      >
                        <img
                          className='w-8 h-8 rounded-full mr-2'
                          src='https://avatars.githubusercontent.com/u/62835101?v=4'
                          alt='user photo'
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Popover.Panel className='absolute z-10 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-48'>
                          <div className='py-1'>
                            <Link
                              to='/profile'
                              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            >
                              Profile
                            </Link>
                            <Link
                              to='/order'
                              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            >
                              My Orders
                            </Link>
                            <Link
                              to='/wishlists'
                              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            >
                              My Wishlist
                            </Link>

                            <a
                              href='#'
                              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            >
                              Checkout
                            </a>
                            <a
                              href='#'
                              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            >
                              Settings
                            </a>
                            <a
                              href='#'
                              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            >
                              Become a Patron
                            </a>
                            <button
                              onClick={logout}
                              className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
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
            {!isLoggedIn && (
              <div className='ml-2'>
                <Link
                  to='/signup'
                  className='m-2 py-2 px-4 rounded-md duration-200 border-b border-gray-100  text-black hide-on-small-screen'
                >
                  Sign Up
                </Link>
                <Link
                  to='/signin'
                  className='m-2 py-2 px-4 rounded-md duration-200 border-b border-gray-100  text-black hide-on-small-screen'
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  setSearchResults: PropTypes.func.isRequired,
};

export default Header;
