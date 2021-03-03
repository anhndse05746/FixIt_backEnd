require('dotenv/config');
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');


// require("sequelize");
const routers = require('./src/routers/routers');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

// Setup router
routers.setupRouters(app);
// Object.keys(db).forEach(modelName => {
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });
app.listen(process.env.PORT || '4000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3000'}`);
});
