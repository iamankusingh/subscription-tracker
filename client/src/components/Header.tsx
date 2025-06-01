import React from "react";
import { NavLink } from "react-router";

const Header: React.FC = () => {
  return (
    <header className="h-10 w-full bg-cyan-900 flex items-center justify-around sticky top-0">
      <div>
        <NavLink to="/" end>
          <h1>Subscription Tracker</h1>
        </NavLink>
      </div>

      <nav className="flex gap-4">
        <NavLink to="/sign-up" end className="p-1 rounded-sm bg-teal-600">
          Sign up
        </NavLink>

        <NavLink to="/sign-in" end className="p-1 rounded-sm bg-teal-600">
          Login
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
