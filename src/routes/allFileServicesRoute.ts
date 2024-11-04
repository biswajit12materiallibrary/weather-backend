import { Router, Response, NextFunction, RequestHandler } from "express";
// import { MyUserRequest } from "";
import { allRouteFuctionMiddleware } from "../middleware/commonMiddleware";
import { middlewaresWeatherObj } from "../apiMiddlewareFileService/weatherMiddleware";

export const allFileServicesRouter = Router();

allFileServicesRouter.post(
  "/weather/:endpointKey",
  allRouteFuctionMiddleware(middlewaresWeatherObj)
);
