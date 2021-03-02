const { connect, connection, disconnect } = require('mongoose')
const MongoStore = require('connect-mongo').default;
const dotenv = require('dotenv');
dotenv.config();

connect(process.env.DB_PATH, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const startDb = connection;

const sessionStore = MongoStore.create({ mongoUrl: process.env.SESSION_DB_PATH });

module.exports = {
  startDb,
  disconnect,
  sessionStore
}

