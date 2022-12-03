import { schedules, users } from "../model/index.js";
import responses from "../utils/respons.js";
import validation from "../utils/validator.js";

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns any
 * @description This function is used to update the schedule of a user, requires a valid email, id and title
 */
const updateSchedule = async (req, res) => {
  const { id, email } = req.query;
  const { title } = req.body;

  const validate = await validation(req, {
    body: ["title"],
    query: ["email", "id"],
  });
  if (validate.length > 0) {
    return responses[validate[0][0]](res, validate[0][1]);
  }

  const user = await users.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return responses.notFound(res, "Email is not found");
  }

  const schedule = await schedules.findOne({
    where: { schedule_id: id },
    include: users,
  });

  if (!schedule) {
    return responses.notFound(res, `Schedule with ID ${id} Not Found`);
  }

  if (schedule.user.email !== email) {
    return responses.forbidden(res, "Access denied!");
  } else {
    const update = await schedules.update(
      { title },
      { where: { schedule_id: id } }
    );

    if (update) {
      let updatedSchedule = await schedules.findOne({
        where: { schedule_id: id },
        attributes: [
          ["schedule_id", "id"], // aliases the column name
          "user_id",
          "title",
          "day",
          "createdAt",
          "updatedAt",
        ],
      });
      return responses.created(res, updatedSchedule);
    } else {
      return responses.badRequest(res, "Failed to update schedule");
    }
  }
};

export default updateSchedule;
