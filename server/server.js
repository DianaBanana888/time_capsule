const app = require("./app.js");
let cron = require("node-cron");
let nodemailer = require("nodemailer");
const NoteModel = require("./models/note.model");
const fetch = require("node-fetch");
// cron
// e-mail message options
let mailOptions = {
  from: process.env.SENDER_EMAIL,
  to: '',
  subject: 'Email from Time Capsule',
  attachments: [{ filename: '', path: '' }],
  html: `<h2 style="color: darkblue; padding: 30px ; width: 100%; text-align: center;">
    Это письмо было отправлено Вам из прошлого. Time Capsule - хранитель Ваших воспоминаний.
    </h2>`,
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
  const arrayPhoto = []
  const result = await response.json();
  console.log('result', result)
  if (result.message === 'Есть запись для отправки') {
    result.note.map(element => {
      if (element.photo.length > 0) {
        element.photo.map(el => {
          arrayPhoto.push({ filename: el.originalFileName, path: `./../front${el.filePath}` })
        })
      }
      transporter.sendMail(
        {
          ...mailOptions,
          to: element.receivers,
          attachments: arrayPhoto,
          html: `
              <div style="background-color: aliceblue; width: 90%;">
              <p style="color: darkblue; width: 100%;  font-style: italic;">Текст отправителя:</p>
              <br />
              <div style="color: darkblue; width: 100%;  font-style: italic; font-size: 120%;">
              ${element.text}
              </div>
              <p style="color: darkblue; width: 100%;  font-style: italic; text-align: right;">
              Письмо было создано ${new Date(element.creationDate).toLocaleString()} отправителем ${element.sender}</p>
              <br />
              <h2 style="color: darkblue; padding: 30px ; width: 100%; text-align: center;">
              <a href='http://localhost:3000/' style="color: darkblue; width: 100%; text-align: center; font-size: 120%; text-decoration: none;">Это письмо было отправлено Вам из прошлого. Time Capsule - хранитель Ваших воспоминаний.</a>
              </h2>
            </div >`,
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
