import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


const NavBar = () => {
  const [MenuOpen, setMenuOpen] = useState(false);
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const handleMenuToggler = () => {
    setMenuOpen(!MenuOpen);
  };

  const navItems = [
    { path: "/", title: "Search for Job" },
    { path: "/my-job", title: "Jobs" },
    { path: "/salary", title: "Estimated Salary" },
    { path: "/post-job", title: "Post A Job" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-2xl">
        <svg
        xmlns="http://www.w3.org/2000/svg"
 width="40"
 height="40"
 viewBox="0 0 40 40"
 fill="none"
 aria-label="Job Search Logo"
>

 <rect
   x="10"
   y="12"
   width="20"
   height="16"
   rx="2"
   fill="#FFA500"
 />
 <rect
   x="14"
   y="8"
   width="12"
   height="4"
   rx="1"
   fill="#FFA500"
 />
 <line
   x1="10"
   y1="18"
   x2="30"
   y2="18"
   stroke="white"
   strokeWidth="2"
 />

 <circle
   cx="28"
   cy="28"
   r="6"
   fill="none"
   stroke="#FFA600"
   strokeWidth="2"
 />
 <line
   x1="32"
   y1="32"
   x2="36"
   y2="36"
   stroke="#FFA600"
   strokeWidth="2"
   strokeLinecap="round"
 />
</svg>


          <span style={{ color: '#FFA600', fontWeight: 'bold' }}>Job Board</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggler */}
        <button
  onClick={handleMenuToggler}
  className="md:hidden text-primary text-2xl"
  aria-label="Toggle Menu"
>
  {MenuOpen ? "✖" : "☰"}
</button>


{/* Mobile Navigation */}
<ul
  className={`absolute top-16 left-0 w-full bg-gray-100 text-orange-600 shadow-md p-4 md:hidden ${
    MenuOpen ? "" : "hidden"
  }`}
  role="menu"
  aria-label="Mobile Navigation"
>
  {navItems.map(({ path, title }) => (
    <li key={path} className="text-base text-primary mb-4" role="menuitem">
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? 'active' : '')}
        onClick={() => setMenuOpen(false)}
      >
        {title}
      </NavLink>
    </li>
  ))}
        
  {isAuthenticated ? (
    <button
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      className="text-primary"
    >
      Log Out
    </button>
  ) : (
    <button
      onClick={() => loginWithRedirect()}
      className="text-primary"
    >
      Log In
    </button>
  )}

</ul>



        {/* Action Buttons */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
        
  {isAuthenticated ? (
    <button
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      className="bg-orange-600 text-white px-4 py-2 rounded"
    >
      Log Out
    </button>
  ) : (
    <button
      onClick={() => loginWithRedirect()}
      className="bg-orange-600 text-white px-4 py-2 rounded"
    >
      Log In
    </button>
  )}
</div>

      </nav>
    </header>
  );
};

export default NavBar;
