import express from "express";
import cache from "express-api-cache";
import * as controllers from "../controllers/index.js";

const Cache = cache.cache;

const router = express.Router();

router.post("/checkin", Cache("5 minutes"), controllers.checkIn);
router
  .route("/schedule")
  .get(Cache("5 minutes"), controllers.schedule)
  .post(Cache("5 minutes"), controllers.addSchedule)
  .patch(controllers.updateSchedule)
  .delete(controllers.deleteSchedule);

// catch undefined routes or methods
router.use("/", (req, res) =>
  res.json({ success: "Success", message: "Welcome to the API" })
);

export default router;
