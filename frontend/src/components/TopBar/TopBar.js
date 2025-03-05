import React, { useState } from "react";
import "./TopBar.css";

const TopBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="topbar">
      <div className="app_name">Personal Finance Tracker</div>
      <button
        className="profile"
        onClick={handleExpand}
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.key === " ") handleExpand();
        }}
        aria-expanded={isExpanded}
      >
        <i className="fas fa-user-circle profile-icon"></i>
        {isExpanded && (
          <div className="profile-card">
            <div className="profile-details">
              <p>Name: Your Name</p>
              <p>Email: your.email@example.com</p>
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default TopBar;
