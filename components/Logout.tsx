import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          navigate("/");
        } else {
          console.error("Failed to log out");
        }
      })
      .catch((err) => console.error("Error during logout:", err));
  };
  return (
    <div className="logout-section">
      <Button
        variant="plain"
        onClick={handleLogout}
        endDecorator={<LogoutIcon />}
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
