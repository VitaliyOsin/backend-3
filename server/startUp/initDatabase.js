// 1. У любого пользователя будет как минимум в БД qualities & professions
// 2. Они равны mock данным

const professionMock = require("../mock/professions.json");
const qualitiesMock = require("../mock/qualities.json");
const Profession = require("../models/Professions");
const Quality = require("../models/Quality");

module.exports = async () => {
  const qualities = await Quality.find();
  if (qualities.length !== qualitiesMock.length) {
    await createInitialEntities(Quality, qualitiesMock);
  }
  const professions = await Profession.find();
  if (professions.length !== professionMock.length) {
    await createInitialEntities(Profession, professionMock);
  }
};

async function createInitialEntities(Model, data) {
  await Model.collection.drop();
  console.log("Mongo: Initial DB was updated ===>");
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (err) {
        return err;
      }
    })
  );
}
