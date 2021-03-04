const app = require('./app.js');
const fileUpload = require('express-fileupload');
let cron = require('node-cron');
let nodemailer = require('nodemailer');
const NoteModel = require('./models/note.model');

app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ message: 'Файл не загружен' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/../front/public/uploads/${new Date().getTime() + '-' + file.name}`, err => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${new Date().getTime() + '-' + file.name}` });
  });
});


const textFromDb = async () => {
  const result = (await NoteModel.findOne({ _id: '603faa7fafd5814ba587c929' })).text;
  return await result;
};

const textConst = textFromDb();
console.log('------', textConst);

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
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

cronStart.stop();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server started at http//localhost:%s', port);
});
