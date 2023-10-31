import env from "./enviroment.config.js";

export const emailConfig = {
  service: "gmail",
  auth: {
    user: env.email,
    pass: env.password,
  },
};
