const app = require("./app.js");
let cron = require("node-cron");
let nodemailer = require("nodemailer");
const NoteModel = require("./models/note.model");
const fetch = require("node-fetch");
// cron
// e-mail message options
let mailOptions = {
  from: process.env.SENDER_EMAIL,
  to: "",
  subject: "Email from Time Capsule",
  text: "",
  attachments: [{ path: "" }],
};
// e-mail transport configuration
let transporter = nodemailer.createTransport({
  service: "mail.ru",
  port: 993,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

const cronStart = cron.schedule("* * * * *", async () => {
  const response = await fetch("http://localhost:5000/search/send-now", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });

  const result = await response.json();
  console.log("result", result);
  if (result.message === "Есть запись для отправки") {
    result.note.map((element) => {
      transporter.sendMail(
        {
          ...mailOptions,
          to: element.receivers,
          text: element.text,
          attachments: [{ path: `./../front${element.photo}` }],
        },
        function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );
    });
  }
});

// cronStart.stop();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started at http//localhost:%s", port);
});
