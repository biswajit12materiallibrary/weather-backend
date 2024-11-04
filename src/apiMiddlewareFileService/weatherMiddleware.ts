// import { Auth } from "../middleware/authentication";
import { Router, Response, NextFunction, RequestHandler } from "express";
import { baseValidation } from "../validation/baseValidation";
import { weatherController } from "../controller/weatherController";

// const auth = new Auth();
const weathercontroller = new weatherController();
// Define the types of the middlewaresDownloadObj to ensure it complies with TypeScript
export const middlewaresWeatherObj: {
  [key: string]: RequestHandler[];
} = {
  GETWEATHER: [
    // ...baseValidation.location, // The validation is an array of middlewares
    weathercontroller.weather,
  ],
  GETWEATHERHISTORY: [weathercontroller.getWeatherHistory],
};
