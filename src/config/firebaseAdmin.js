const admin = require("firebase-admin");
const serviceAccount = require("../config/fir-project-b086a-firebase-adminsdk-hq74w-92ee59b2a6.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = admin