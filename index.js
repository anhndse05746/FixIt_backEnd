require('dotenv/config');
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');

const routerWeb = require('./src/routers/web.router');
const routerMobile = require('./src/routers/mobile.router');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

// Setup router
routerWeb.setupWebRouter(app);
routerMobile.setupMobileRouter(app);

app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3000'}`);
});
