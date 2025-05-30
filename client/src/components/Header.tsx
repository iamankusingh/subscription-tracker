import React from "react";

const Header: React.FC = () => {
  return (
    <header className="h-10 w-screen bg-cyan-900 flex">
      <div>
        <h1>Subscription Tracker</h1>
      </div>

      <div>
        <a href="">Sign-up</a>
        <a href="">Log-in</a>
      </div>
    </header>
  );
};

export default Header;
