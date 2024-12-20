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
        style={{
          backgroundColor: "white",
          color: "#333",
          border: "2px solid #ddd",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
