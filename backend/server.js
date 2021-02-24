const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Database setup
const { dbusername } = process.env;
const { dbpassword } = process.env;
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(`mongodb+srv://${dbusername}:${dbpassword}@in-cluster.yopex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
const { connection } = mongoose;
connection.once('open', () => { console.log('MongoDB connected'); });

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

// HTML
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'client/build', 'index.html')));

app.listen(3001, () => console.log('Backend live on port 3001'));
