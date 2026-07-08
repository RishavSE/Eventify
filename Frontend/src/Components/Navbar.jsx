import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setRole(localStorage.getItem("role") || "");
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    setMenuOpen(false);
    navigate("/signin");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMenuOpen(false);
      setUser(null);
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getDisplayName = () => {
    if (!user) return "";
    return user.displayName ? user.displayName.split(" ")[0] : user.email;
  };

  return (
    <nav className="navbar">
      <div className="logo">
        🎟️ <b>Eventify</b>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      {role === "admin" ? (
        <div className="admin-navbar">
          <span>Admin: {getDisplayName()}</span>

          <Button
            label="Logout"
            className="p-button-sm p-button-danger"
            onClick={handleLogout}
          />
        </div>
      ) : (
        <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/events" onClick={() => setMenuOpen(false)}>
                Events
              </Link>
            </li>

            <li>
              <Link to="/movies" onClick={() => setMenuOpen(false)}>
                Movies
              </Link>
            </li>

            <li>
              <Link to="/my-tickets" onClick={() => setMenuOpen(false)}>
                My Tickets
              </Link>
            </li>
          </ul>

          <div className="auth-section">
            {user ? (
              <>
                <span className="welcome-text">
                  Welcome, {getDisplayName()}
                </span>

                <Button
                  label="Logout"
                  className="p-button-sm p-button-danger"
                  onClick={handleLogout}
                />
              </>
            ) : (
              <Button
                label="Sign In"
                className="p-button-sm p-button-primary"
                onClick={handleSignIn}
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
