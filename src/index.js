import express from "express";
import dotenv from "dotenv";
import db from "./db/index.js";
import { schedules, users } from "./model/index.js";
import router from "./routes/index.js";
import loger from "morgan";
import compression from "compression";
import cluster from "cluster";
import os from "os";

const totalCPUs = os.cpus().length;

dotenv.config();
const port = process.env.PORT || 3030;

// clustering app to improve performance
if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);

    // Let's fork another worker!
    cluster.fork();
  });
} else {
  const app = express();

  try {
    await db.authenticate();
    await users.sync();
    await schedules.sync();
    console.log("Connection has been established successfully.");

    app.use(loger("dev"));
    app.use(compression());

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(router);

    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}


