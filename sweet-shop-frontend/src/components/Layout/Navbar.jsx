import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Candy } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <Candy size={32} color="#2d3748" />
          <span style={styles.brandText}>Sweet Shop</span>
        </div>
        <div style={styles.navRight}>
          <div style={styles.userInfo}>
            <User size={20} />
            <span>{user?.username}</span>
            {user?.role === 'admin' && (
              <span style={styles.badge}>Admin</span>
            )}
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            <LogOut size={18} />
            Logout2
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'white',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderBottom: '1px solid #e5e7eb',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '24px',
    fontWeight: '700',
  },
  brandText: {
    color: '#2d3748',
    fontWeight: '700',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#1a202c',
    fontWeight: '600',
  },
  badge: {
    background: 'linear-gradient(135deg, #2d3748, #1a202c)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    boxShadow: '0 2px 10px rgba(45, 55, 72, 0.3)',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    background: 'linear-gradient(135deg, #2d3748, #1a202c)',
    border: 'none',
    color: 'white',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(45, 55, 72, 0.4)',
  },
};

export default Navbar;