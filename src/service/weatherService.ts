import weatherSchema from "../model/weather";
const axios = require("axios");
import { config } from "../config/configEnv";

export const getWeather = async (req: any) => {
  try {
    const { location } = req;
    let response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${config.WEATHER_API_KEY}
`
    );
    if (!response?.data?.[0]?.lat && !response?.data?.[0]?.lon) {
      return {
        success: false,
        message: "Weather data not found",
        statusCode: 404,
      };
    }
    response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${response?.data?.[0]?.lat}&lon=${response?.data?.[0]?.lon}&appid=${config.WEATHER_API_KEY}`
    );
    console.log(response.data);

    if (!response.data) {
      return {
        success: false,
        message: "Weather data not found",
        statusCode: 404,
      };
    }
    // const weatherData = {
    //   location,
    //   temperature: response.data?.main?.temp,
    //   description: response.data.weather?.[0]?.description,
    //   icon: response.data.weather?.[0]?.icon,
    //   visibility: response?.data?.visibility,
    //   wind: response?.data?.wind,
    // };

    const newWeather = await weatherSchema.create({
      location,
      ...response?.data,
    });

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
    // Set default startDate to one week ago if it's not provided
    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultStartDate.getDate() - 7); // Set to 7 days ago
    defaultStartDate.setHours(0, 0, 0, 0); // Set to start of the day
    // Set default endDate to today if it's not provided
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to end of today
    const history = await weatherSchema
      .find({
        location: { $regex: location, $options: "i" }, // Case-insensitive search
        createdAt: {
          $gte: startDate ? new Date(startDate) : defaultStartDate,
          $lte: endDate ? new Date(endDate) : today,
        },
      })
      .lean();
    if (!history?.length) {
      throw new Error("Weather does not exists");
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
