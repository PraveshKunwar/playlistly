import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const HomeButton: React.FC = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className="logout-section">
      <Button
        variant="plain"
        onClick={handleGoHome}
        endDecorator={<HomeIcon />}
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
        Home
      </Button>
    </div>
  );
};

export default HomeButton;
