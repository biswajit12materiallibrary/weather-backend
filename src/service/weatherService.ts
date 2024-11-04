import weatherSchema from "../model/weather";
const axios = require("axios");
import { config } from "../config/configEnv";

export const getWeather = async (req: any) => {
  try {
    const { lat, lon } = req;
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall/overview?lat=${lat}&lon=${lon}&appid=${config.WEATHER_API_KEY}`
    );
    console.log(response.data);
    const weatherData = {
      location,
      temperature: response.data.main.temp,
      description: response.data.weather?.[0]?.description,
      icon: response.data.weather?.[0]?.icon,
    };

    const newWeather = await weatherSchema.create(weatherData);

    return {
      success: true,
      data: newWeather,
      message: "Weather get successfully",
      statusCode: 200,
    };
  } catch (err) {
    return {
      success: false,
      data: {},
      message: err.message,
      statusCode: 404,
    };
  }
};
export const getWeatherHistory = async (req: any) => {
  try {
    const { location, startDate, endDate } = req;

    const history = await weatherSchema.find({
      location,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    if (!history?.length) {
      throw new Error("Email does not exists");
    }

    return {
      success: true,
      data: history,
      message: "Weather get successfully",
      statusCode: 200,
    };
  } catch (err) {
    return {
      success: false,
      data: {},
      message: err.message,
      statusCode: 404,
    };
  }
};
