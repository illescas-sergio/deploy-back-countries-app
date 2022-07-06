//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const axios = require("axios");
const server = require("./src/app.js");
const { conn, Country } = require("./src/db");

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  try {
    let dataDb = await Country.findAll();
    if (dataDb.length === 0) {
      try {
        let resp = await axios.get("https://restcountries.com/v3.1/all");
        let apiData = resp.data;
        apiData &&
          apiData.map(
            async (c) =>
              await Country.findOrCreate({
                where: {
                  id: c.cca3,
                  name: c.name.common,
                  flag: c.flags.png,
                  continent: c.continents
                    ? c.continents[0]
                    : "continent not found",
                  capital: c.capital ? c.capital[0] : "capital not found",
                  subregion: c.subregion
                    ? c.subregion
                    : "subregion not available",
                  area: c.area,
                  population: c.population || 0,
                },
              })
          );
      } catch (err) {
        console.error(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
