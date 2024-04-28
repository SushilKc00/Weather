import React from "react";

import Header from "../../Components/Header/Header";
import WeatherSearch from "../../Components/WeatherSearch/WeatherSearch";

// const socket = io("http://localhost:8080/");

export const Home: React.FC = () => {
  return (
    <>
      <main
        className="home-main-container "
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?weather')",
        }}
      >
        <Header />
        <WeatherSearch />
      </main>
    </>
  );
};
