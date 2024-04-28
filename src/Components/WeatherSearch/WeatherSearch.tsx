import { useEffect, useState } from "react";
import Loading from "../Loader/Loading";

export interface WeatherDataTypes {
  city: string;
  humidity: number;
  temp: number;
  wind: {
    speed: number;
  };
}

function WeatherSearch() {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherDataTypes | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const apiKey = "e7356bf9406fa69a73ef8333ae0f6fc0"; //

  const fetchWeatherData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData({
        ...data.main,
        wind: {
          speed: data.wind.speed,
        },
      });
      setError(null);
      setIsLoading(false);
    } catch (error) {
      setError("City not found");
      setWeatherData(null);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim() !== "") {
      fetchWeatherData();
    }
  };

  const fetchWeatherByCoordinates = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Weather data not found");
      }
      const data = await response.json();
      console.log(data);
      setWeatherData({
        ...data.main,
        city: data.name,
        wind: {
          speed: data.wind.speed,
        },
      });

      setError(null);
    } catch (error) {
      setError("Weather data not found");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    // Fetch weather data for user's current location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
        },
        () => {
          setError(`"Unable to retrieve your location you can search by name"`);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5">
      <div className="max-w-[400px] min-h-[120px] w-full bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6">
        <h1 className="text-4xl text-center font-semibold mb-4 text-white">
          Weather Dashboard
        </h1>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-gray-200 px-4 py-2 text-2xl rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
          />
          <button
            type="submit"
            className="bg-blue-500 text-lg font-medium text-white px-4 py-3 rounded-r-md ml-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isloading ? <Loading size={12} /> : "Search"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {weatherData?.city && (
          <h2 className="text-center mt-4 text-2xl font-semibold text-slate-300">{`Weather details of ${weatherData?.city}`}</h2>
        )}

        {weatherData && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Temperature</h2>
              <p className="text-2xl">{weatherData.temp}°C</p>
            </div>
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Humidity</h2>
              <p className="text-2xl">{weatherData.humidity}%</p>
            </div>
            <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Wind Speed</h2>
              <p className="text-2xl">{weatherData.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherSearch;
