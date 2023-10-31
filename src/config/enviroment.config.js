import dotenv from "dotenv";
dotenv.config();

const email = process.env.GOOGLE_EMAIL;
const password = process.env.GOOGLE_PASSWORD;

export default { email, password };
