const { Router } = require("express");
const { conn } = require("../db.js");
const { Activity, Country } = conn.models;

const router = Router();

router.post("/activity", async (req, res, next) => {
  try {
    const { name, difficulty, duration, season, countryId } = req.body;
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    // const country = await Country.findByPk(countryId);
    newActivity.addCountry(countryId);
    // country.addActivity(newActivity);

    res.status(201).send(newActivity);
  } catch (error) {
    next(error);
  }
});

router.get("/activities", async (req, res, next) => {
  try {
    const activities = await Activity.findAll({
      include: [
        {
          model: Country,
          through: "country_activity",
        },
      ],
    });

    res.status(200).send(activities);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
