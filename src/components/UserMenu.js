import React, { useState } from 'react';
import './UserMenu.css';

export default function UserMenu({ user, onLogout, onProfileClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="user-menu" onClick={toggleDropdown}>
      <div className="profile-icon" style={{ backgroundColor: '#fff', color: '#572E54' }}>
        {user.email.charAt(0).toUpperCase()}
      </div>
      {isOpen && (
        <div className="dropdown">
          <p onClick={() => { onProfileClick('dashboard'); setIsOpen(false); }}>Dashboard</p>
          <p onClick={() => { onProfileClick('profile'); setIsOpen(false); }}>My Profile</p>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}

    </div>
  );
}
