function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateUserData() {
  return {
    rate: getRandomInt(1, 5),
    completedMeetings: getRandomInt(0, 200),
    image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
      .toString(36)
      .substring(7)}.svg`,
  };
}

function blockTC(req, res, fn) {
  try {
    fn();
  } catch (err) {
    res.status(500).json({
      message:
        "На сервере произошла ошибка. Попробуйте зайти позже." + err.message,
    });
  }
}

module.exports = {
  generateUserData,
  blockTC,
};
