import { users } from "../model/index.js";
import responses from "../utils/respons.js";
import validation from "../utils/validator.js";

/**
 * @param {*} req
 * @param {*} res
 * @returns any
 * @description This function is used to authenticate a user, requires a valid email
 */
const checkIn = async (req, res) => {
  const { email } = req.body;

  const validate = await validation(req, {
    body: ["email"],
  });
  if (validate.length > 0) {
    return responses[validate[0][0]](res, validate[0][1]);
  }
  

  const user = await users.findOne({ where: { email } });
  if (!user) {
    let user = await users.create({ email });
    return responses.success(res, user);
  } else {
    return responses.success(res, user);
  }
};

export default checkIn;
