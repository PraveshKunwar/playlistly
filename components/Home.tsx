import React from "react";
import Login from "./Login";

const Home: React.FC = () => {
  return (
    <div className="home-section">
      <section className="home-about">
        <h1>
          Seamlessly generate playlists based off listening history and other
          statistics!
        </h1>
      </section>
      <section className="home-login">
        <Login />
      </section>
    </div>
  );
};

export default Home;
