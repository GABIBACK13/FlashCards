import express, { Express } from "express";
import { resolve } from "path";
import helmet from "helmet";
import rateLimiting from "express-rate-limit";
import cors from "cors";

import "./models/index";
import { CorsOptions } from "cors";

import homeRoutes from "./routes/home.route";
import collectionRoutes from "./routes/collection.route";
import cardRoutes from "./routes/card.route";

const limiter = rateLimiting({
  windowMs: 1000 * 60 * 60 * 12,
  max: 120,
  message: "too many requests, await for a few minutes to call more",
});

const whiteList = [`${process.env.APP_URL}`, `${process.env.SITE_URL}`];
const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void): void {
    if (whiteList.indexOf(origin || "") !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

class App {
  public app: Express;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
      })
    );
    this.app.use(limiter);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use("/images/", express.static(resolve(__dirname, "..", "uploads", "images")));
  }
  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/collections", collectionRoutes);
    this.app.use("/collections/:collectionID/cards", cardRoutes);
  }
}

export default new App().app;
