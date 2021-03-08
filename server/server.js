const app = require('./app.js');
let cron = require('node-cron');
let nodemailer = require('nodemailer');
const NoteModel = require('./models/note.model');

// const textFromDb = async () => {
//   const result = (await NoteModel.findOne({ _id: '6040d63f0511ec83b667b647' })).text;
//   console.log('result', result)
//   return result;
// };

// const textConst = textFromDb();
// console.log('------', textConst);

// cron
// e-mail message options
let mailOptions = {
  from: 'center63@mail.ru',
  to: 'center63@mail.ru',
  subject: 'Email from Time Capsule',
  text: 'textConst',
};
// e-mail transport configuration
let transporter = nodemailer.createTransport({
  service: 'mail.ru',
  port: 993,
  auth: {
    user: 'center63@mail.ru',
    pass: '3s41fRw',
  },
});

const cronStart = cron.schedule('* * * * *', () => {
  // Send e-mail
  textFromDb().then((text) => {
    transporter.sendMail({ ...mailOptions, text }, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  })
});

cronStart.stop();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server started at http//localhost:%s', port);
});

// [[hello]]
// [[hello42]]
