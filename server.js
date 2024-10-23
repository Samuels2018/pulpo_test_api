const express = require('express');
const cors = require('cors');
//const cookieParser = require('cookie-parser');
const {sequelize}  = require('./src/models');
const indexRouter = require('./src/routes/index');

const app = express();


const corsOptions = {
  origin: 'http://localhost',  // Permite tu frontend
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use("/", indexRouter);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(3000, (err) => {
      if (err) {
        console.log(err);
        process.exit(-1);
      }
      console.log("Server is running on port 3000");
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


