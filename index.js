const express = require('express');
require('dotenv/config');
const userAPI = require('./src/api/userAPI');
const app = express();


app.use(express.json());

app.use('/api', userAPI);

app.listen(process.env.PORT || '3000', () => {

    console.log(`Server is running on port: ${process.env.PORT || '3000'}`);

});
// app.listen(3000);
