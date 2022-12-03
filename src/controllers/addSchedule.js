import { schedules, users } from "../model/index.js";
import responses from "../utils/respons.js";
import validation from "../utils/validator.js";

/**
 *
 * @param {*} req req.body = {title, day}, req.query = {email}
 * @param {*} res
 * @returns any
 * @description This function adds a schedule to the database, requires a valid email, day and title
 */
const addSchedule = async (req, res) => {
  const { email } = req.query;
  const { title, day } = req.body;

  const validate = await validation(req, {
    body: ["title", "day"],
    query: ["email"],
  });
  if (validate.length > 0) {
    return responses[validate[0][0]](res, validate[0][1]);
  }

  const user = await users.findOne({ where: { email } });
  if (!user) {
    return responses.notFound(res, "Email is not found");
  } else {
    const schedule = await schedules.create({
      user_id: user.user_id,
      title,
      day,
    });
    let { user_id, updatedAt, createdAt } = schedule;
    const data = {
      user_id,
      updatedAt,
      createdAt,
    };
    data.id = schedule.schedule_id;
    data.title = schedule.title;
    data.day = schedule.day;

    return responses.created(res, data);
  }
};

export default addSchedule;
