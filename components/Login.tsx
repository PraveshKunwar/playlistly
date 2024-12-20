import React, { useEffect, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { Button } from "@mui/joy";
import { UserData } from "../interfaces/UserData"; // Ensure this interface exists and is correct
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setUserData(data);
        }
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);
  const handleLogin = () => {
    window.location.href = "http://127.0.0.1:5000/login";
  };

  return (
    <div className="login-section">
      {userData ? (
        <>
          <h3>Welcome back, {userData.display_name}!</h3>
          <p>Email: {userData.email}</p>
          <p>Followers: {userData.followers.total}</p>
          <Button
            variant="plain"
            onClick={() => navigate("/generate")}
            endDecorator={<LoginIcon />}
          >
            Go to Playlist Generator
          </Button>
        </>
      ) : (
        <>
          <h3>Login using the button below:</h3>
          <Button
            variant="plain"
            onClick={handleLogin}
            endDecorator={<LoginIcon />}
          >
            Login
          </Button>
        </>
      )}
    </div>
  );
};

export default Login;
