require('dotenv').config({ path: '../.env' });
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB);
console.log(__dirname + '');
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

async function createUser() {
    try {
        const User = require('../model/userModel');
        const passwordHash = await bcrypt.hash('test', 12);
        await new User({
            email: 'test@gmail.com',
            password: passwordHash,
        }).save();
        console.log('👍👍👍👍👍👍👍👍 User created : Done!');
        process.exit();
    } catch (e) {
        console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below');
        console.log(e);
        process.exit();
    }
}
createUser();
