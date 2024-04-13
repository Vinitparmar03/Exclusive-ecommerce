import cors from "cors";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import { errorMiddleware } from "./src/middlewares/error.js";
import NodeCache from "node-cache";
import Stripe from "stripe";
import { connectDB } from "./src/utils/features.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectRedis from "connect-redis";
import redis from "redis";

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

import userRoute from "./src/routes/user.js";
import productRoute from "./src/routes/product.js";
import orderRoute from "./src/routes/order.js";
import paymentRoute from "./src/routes/payment.js";
import dashboardRoute from "./src/routes/stats.js";

const port = process.env.PORT || 5000;

const store = new session.MemoryStore();

const stripeKey = process.env.STRIPE_KEY;
const MONGO_URI = `${process.env.MONGO_URI}/exclusive`;

connectDB(MONGO_URI);

export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();

export const cookieMiddleware = cookieParser();

const app = express();

app.use(cookieParser());

app.use(
  session({
    secret: "vinit bhai hai vinit bhai ukhad le",
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient }),
    cookie: {
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API working with /api/v1");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is working on port ${port}`);
});
