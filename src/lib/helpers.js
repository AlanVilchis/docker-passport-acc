const bcrypt = require('bcryptjs')

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // hash
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword)
    } catch(e) {
        console.log(e)
    }
};

helpers.generateRandomNumberCode =  (length) => {
    const size_digits = Math.pow(10, length - 1);
    return Math.floor(Math.random()*9 * size_digits) + 1 * size_digits;
};


module.exports = helpers;