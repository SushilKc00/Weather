# Weather Dashboard

This is a simple weather dashboard application built with React, Tailwind CSS, and Redux Toolkit. It allows users to search for weather information by city name and also displays the weather details for the user's current location upon initial page load.

## Setup Instructions

To run this application locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone <repository_url>
   Navigate to the project directory:
   bash
   Copy code
   cd weather-dashboard
   Install dependencies using npm:
   bash
   Copy code
   npm install
   Obtain an API key from OpenWeatherMap by signing up at https://openweathermap.org/api and replace YOUR_API_KEY in src/WeatherSearch.js with your actual API key.
   Running the Application
   After completing the setup, you can run the application with the following command:
   ```

bash
Copy code
npm start
This will start the development server and open the application in your default web browser. You can then interact with the weather dashboard by searching for city names or allowing location access for the user's current weather details.

Additional Notes
This application uses the Geolocation API to fetch the user's current location upon initial page load. Please make sure your browser supports geolocation.
Ensure an active internet connection to fetch weather data from the OpenWeatherMap API.
