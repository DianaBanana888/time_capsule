const app = require('./app.js');
let cron = require('node-cron');
let nodemailer = require('nodemailer');
const fetch = require("node-fetch");

// const textFromDb = async () => {
//   const result = (await NoteModel.findOne({ _id: '6040d63f0511ec83b667b647' })).text;
//   console.log('result', result)
//   return result;
// };

// const textConst = textFromDb();

// cron
// e-mail message options
let mailOptions = {
  from: process.env.SENDER_EMAIL,
  to: '',
  subject: 'Email from Time Capsule',
  text: '',
  foto: '',
  footer: 'The email was sent at the request of the user '
};
// e-mail transport configuration
let transporter = nodemailer.createTransport({
  service: 'mail.ru',
  port: 993,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

// const cronStart = cron.schedule('* * * * *', () => {
//   // Send e-mail
//   textFromDb().then((text) => {
//     transporter.sendMail({ ...mailOptions, text }, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
//   })
// });

const cronStart = cron.schedule('* * * * *', async () => {
  console.log('cron')
  //установка даты для эксперимента раздельго времени и даты (Машин вариант)
  // const now = new Date();
  // const nowDay = now.setFullYear(now.getFullYear(), now.getMonth(), now.getDate())
  // const tomorrowDay = now.setFullYear(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  // const getHours = now.getHours();
  // const getMinutes = now.getMinutes();
  // const time = `${getHours}:${getMinutes}`;

  // console.log('data = { nowDay, tomorrowDay, time }', nowDay, tomorrowDay, time)
  // const data = { nowDay, tomorrowDay, time }
  //стоп установка даты

  const response = await fetch('http://localhost:5000/search/send-now', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify()
    // body: JSON.stringify(data)
  });

  const result = await response.json();
  console.log('result', result)
  console.log('result.message', result.message)
  if (result.message === 'Есть запись для отправки') {
    result.note.map(element => {
      transporter.sendMail(
        {
          ...mailOptions,
          to: element.receivers,
          text: element.text,
          foto: element.foto,
        },
        function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        }
      );
    })
  }
});

cronStart.stop();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server started at http://localhost:%s', port);
});
