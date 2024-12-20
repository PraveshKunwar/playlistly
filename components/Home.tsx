import React from "react";
import Login from "./Login";

const Home: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100vh",
        gap: "2rem",
        padding: "1rem",
      }}
    >
      <section>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>
          Seamlessly generate playlists based on your listening history and
          other statistics!
        </h1>
      </section>
      <section>
        <Login />
      </section>
    </div>
  );
};

export default Home;
