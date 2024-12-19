import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setData] = useState<any>(null);
  useEffect(() => {
    fetch("/playlists")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className="home-section">
      <section className="home-about">
        <h1>
          Welcome to playlistly! Seamlessly generate playlists based off
          listening history and other statistics!
        </h1>
      </section>
    </div>
  );
};

export default Home;
