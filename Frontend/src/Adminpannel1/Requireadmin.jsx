import React, { useEffect, useState } from "react";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/signin");
        return;
      }

      const adminEmail = "infosys@gmail.com";
      if (user.email === adminEmail) {
        setAllowed(true);
      } else {
        navigate("/unauthorized");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>🔐 Checking admin access...</p>;

  return allowed ? children : null;
};

export default RequireAdmin;
