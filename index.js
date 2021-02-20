require('dotenv/config');
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');

const routers = require('./src/routers/routers');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

// Setup router
routers.setupRouters(app);

app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3000'}`);
});
