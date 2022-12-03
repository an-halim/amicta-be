import days from "./constanta.js";

const validation = async (req, { body: body = [], query: query = [] }) => {
  let errors = [];
  if (body.length > 0) {
    body.forEach((item) => {
      if (item !== null) {
        if (!req.body[item] || (req.body[item] === "" && errors.length === 0)) {
          errors.push([
            "badRequest",
            `${item[0].toUpperCase() + item.substring(1)} is required`,
          ]);
        }

        if (item === "email" && errors.length === 0) {
          const checkEmal =
            req.body[item] !== "" &&
            req.body[item] &&
            req.body[item].match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

          if (!checkEmal) {
            errors.push(["badRequest", `Invalid email`]);
          }
        }

        if (
          item === "day" &&
          Object.keys(days).indexOf(req.body[item]) === -1 &&
          errors.length === 0
        ) {
          errors.push([
            "badRequest",
            `${item[0].toUpperCase() + item.substring(1)} is invalid`,
          ]);
        }
      }
    });
  }

  if (query.length > 0) {
    query.forEach((item) => {
      if (item !== null) {
        if (
          !req.query[item] ||
          (req.query[item] === "" && errors.length === 0)
        ) {
          errors.push([
            "badRequest",
            `${item[0].toUpperCase() + item.substring(1)} is required`,
          ]);
        }

        if (item === "email" && errors.length === 0) {
          const checkEmal =
            req.query[item] !== "" &&
            req.query[item] &&
            req.query[item].match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

          if (!checkEmal) {
            errors.push(["badRequest", `Invalid email`]);
          }
        }
        if (
          item === "day" &&
          Object.keys(days).indexOf(req.query[item]) === -1 &&
          errors.length === 0
        ) {
          errors.push([
            "badRequest",
            `${item[0].toUpperCase() + item.substring(1)} is invalid`,
          ]);
        }
      }
    });
  }
  errors.length > 0 && console.log("validation error", errors);
  return errors;
};

export default validation;
