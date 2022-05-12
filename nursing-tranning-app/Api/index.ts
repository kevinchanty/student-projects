import express from "express";
import multer from "multer";
import http from "http";
import { Server as SocketIO, Socket } from "socket.io";
import Knex from "knex";
import dotenv from "dotenv";
import ip from "ip";
import path from "path";
import useragent from "express-useragent";
import { ManageQuizService } from "./service/manageQuizService";
import { ManageQuizController } from "./controller/manageQuizController";
import { PopUpQuizService } from "./service/popUpQuizService";
import { PopUpQuizController } from "./controller/popUpQuizController";
import { PhotoFeedService } from "./service/photoFeedService";
import { PhotoFeedController } from "./controller/photoFeedController";
import { UserService } from "./service/userService";
import { UserController } from "./controller/userController";
import { GymController } from "./controller/gymController";
import { GymService } from "./service/gymService";
import { SupermarketController } from "./controller/supermarketController";
import { SupermarketService } from "./service/supermarketService";
import { MyBagController } from "./controller/myBagController";
import { MyBagService } from "./service/myBagService";
import { gameHandlers } from "./handlers/gameHandlers";
import { GuardMiddleware } from "./helper/guard";
import { GameService } from "./service/gameService";
import { GameController } from "./controller/gameController";
import { AnalyticsController } from "./controller/analyticsController"
import { AnalyticsService } from "./service/analyticsService";

import cors from "cors";

dotenv.config();
// console.log(process.env);

const PORT = 3100;

// Express
const app = express();
const server = new http.Server(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(useragent.express())

// Request Logger

// Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("./public/uploads"));
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${file.fieldname}-${Date.now()}.${file.mimetype.split("/")[1]}`
        );
    },
});
export const upload = multer({ storage });

// Socket.io
const io = new SocketIO(server, {
cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const onConnection = (socket: Socket) => {
    gameHandlers(io, socket);
};

// Knex
const knexConfigs = require("./knexfile");
const environment = process.env.NODE_ENV;
if (!environment) {
    throw new Error("No NODE_ENV in .env! 😡");
}
const knexConfig = knexConfigs[environment];
const knex = Knex(knexConfig);

// Dependency
export const manageQuizService = new ManageQuizService(knex);
export const manageQuizController = new ManageQuizController(manageQuizService);
export const popUpQuizService = new PopUpQuizService(knex);
export const popUpQuizController = new PopUpQuizController(popUpQuizService);
export const photoFeedService = new PhotoFeedService(knex);
export const photoFeedController = new PhotoFeedController(photoFeedService);
export const userService = new UserService(knex);
export const userController = new UserController(userService);
export const gymService = new GymService(knex);
export const gymController = new GymController(gymService);
export const supermarketService = new SupermarketService(knex);
export const supermarketController = new SupermarketController(
    supermarketService
);
export const guardMiddleware = new GuardMiddleware(knex, userService);
export const myBagService = new MyBagService(knex);
export const myBagController = new MyBagController(myBagService);
export const gameService = new GameService(knex);
export const gameController = new GameController(gameService, io);
export const analyticsService = new AnalyticsService(knex);
export const analyticsController = new AnalyticsController(analyticsService);

import { routes } from "./routes";
app.use(analyticsController.requestLogger);
app.use("/", routes);
app.use(express.static("./public"));

app.use((req, res, next) => {
    res.status(404).json({
        error: `Route not match, method: ${req.method}, url: ${req.url}`,
    });
});

const message = `============================================
Listening at: http://localhost:${PORT}
On Network: http://${ip.address()}:${PORT}
============================================`;

io.on("connection", onConnection);

server.listen(PORT, () => {
    console.clear();
    console.log(message);
});
