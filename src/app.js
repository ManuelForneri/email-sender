// src/app.mjs
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import nodemailer from "nodemailer";
import { emailConfig } from "./config/email-sender.config.js";
import env from "./config/enviroment.config.js";
import cors from "cors";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname + "/../public"));
const transporter = nodemailer.createTransport(emailConfig);

app.get("/", (req, res) => {
  res.send("Home, haga su post a /send-email");
});
app.post("/send-email", (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const mailOptions = {
      from: env.email,
      to: "manuelforneri@gmail.com",
      subject: subject,
      html: `<div style="background-color: #f5d0c1; padding: 20px">
      <h1 style="color: #000; font-size: 36px; margin-bottom: 0">RAINBOW</h1>
      <h1 style="color: #000; font-size: 36px; margin-bottom: 0">Nombre: ${name}</h1>
      <h2 style="color: #000; font-size: 24px; margin-top: 0">Email: ${email}</h2>
      <h2 style="color: #000; font-size: 24px; margin-top: 0">Asunto: ${subject}</h2>
    </div>
    <div style="background-color: #f8e4d6; padding: 20px">
      <p style="color: #5d534a; font-size: 18px">${message}</p>
    </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Correo electrónico enviado: " + info.response);
      }
    });
    res.send("enviado correctamente");
  } catch (error) {
    throw error;
  }
});

app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});
