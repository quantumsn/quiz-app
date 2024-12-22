const bcrypt = require("bcrypt");

module.exports.hashPassword = async (plainPass) => {
  const saltRounds = 10;
  let salt = await bcrypt.genSalt(saltRounds);
  let hashedPass = await bcrypt.hash(plainPass, salt);
  return hashedPass;
};

module.exports.checkPassword = async (hashedPass, plainPass) => {
  let res = await bcrypt.compare(plainPass, hashedPass);
  return res;
};
