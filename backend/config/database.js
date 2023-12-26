const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL)
        .then((data) => {
            console.log(`MongoDB Connected with server: ${data.connection.host}`);
        })

        // Handled in server.js UNHANDLED PROMISE REJECTION
        // .catch((err) => {
        //     console.log("Error");
        // })
}

module.exports = connectDatabase;

