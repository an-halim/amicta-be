import { schedules, users } from "../model/index.js";
import responses from "../utils/respons.js";
import validation from "../utils/validator.js";

/**
 * @param {*} req
 * @param {*} res
 * @returns any
 * @description This function is used to delete the schedule of a user, requires a valid email and id
 */
const deleteSchedule = async (req, res) => {
  const { email, id } = req.query;

  const validate = await validation(req, {
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
    const destroy = await schedules.destroy({ where: { schedule_id: id } });

    if (destroy) {
      return responses.success(res, {});
    } else {
      return responses.badRequest(res, "Failed to delete schedule");
    }
  }
};

export default deleteSchedule;
