import { schedules, users } from "../model/index.js";
import days from "../utils/constanta.js";
import responses from "../utils/respons.js";
import validation from "../utils/validator.js";

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns any
 * @description This function is used to get the schedule of a user, requires a valid email or day
 */
const schedule = async (req, res) => {
  const { email, day } = req.query;
  
  const validate = await validation(req, {
    query: ["email", day ? "day" : null],
  });
  if (validate.length > 0) {
    return responses[validate[0][0]](res, validate[0][1]);
  }

  const user = await users.findOne({ where: { email } });

  if (!user) {
    return responses.notFound(res, "Email is not found");
  } else {
    const userSchedule = await users.findOne({
      where: { email },
      include: [
        {
          model: schedules,
          attributes: [
            ["schedule_id", "id"], // aliases the column name
            "user_id",
            "title",
            "day",
            "createdAt",
            "updatedAt",
          ],
          where: day ? { day } : {},
        },
      ],
    });

    if (day) {
      if (!userSchedule) {
        return responses.success(res, []);
      }
      // if day is specified, return only the schedules for that day
      return responses.success(res, userSchedule.schedules);
    } else {
      if (!userSchedule) {
        return responses.success(res, days);
      }

      // if day is not specified, return all schedules for the user
      for (const day of Object.entries(days)) {
        userSchedule.schedules.forEach((schedule) => {
          if (schedule.day === day[0]) {
            days[day[0]].push(schedule);
          }
        });
      }

      // return response to client
      return responses.success(res, days);
    }
  }
};

export default schedule;
