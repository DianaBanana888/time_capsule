const app = require('./app.js');
const fileUpload = require('express-fileupload');

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

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server started at http//localhost:%s', port);
});
