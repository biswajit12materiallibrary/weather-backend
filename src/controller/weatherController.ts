import { Request, Response } from "express";
import { getWeather, getWeatherHistory } from "../service/weatherService";
// import { Request } from "../interface/weather";
import { sendResponse } from "../utils/statusCodeResponse";
// import { UserServices } from "../service/userServices";

// import { generateToken } from "../utils/jsonToken";
// import { Request } from "../middleware/authentication";
// import mongoose, { ClientSession } from "mongoose";
// import { v4 as uuidv4 } from "uuid";

export class weatherController {
  // super user signup
  public async weather(req: Request, res: Response) {
    try {
      const data = await getWeather(req.body);
      if (!data?.success) {
        throw new Error(data?.message || "SomeThing Went Wrong");
      }
      return sendResponse(req, res, 200, data);
    } catch (error) {
      return sendResponse(req, res, 200, {
        success: false,
        data: {},
        message: error.message,
        statusCode: 404,
      });
    }
  }

  public async getWeatherHistory(req: Request, res: Response) {
    try {
      const data = await getWeatherHistory(req.query);
      if (!data?.success) {
        throw new Error(data?.message || "SomeThing Went Wrong");
      }
      return sendResponse(req, res, 200, data);
    } catch (error) {
      return sendResponse(req, res, 200, {
        success: false,
        data: {},
        message: error.message,
        statusCode: 404,
      });
    }
  }
}
