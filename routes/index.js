let express = require("express");
let router = express.Router();

const myDB = require("../db/MySqliteDB.js");

// /* GET home page. */
// router.get("/", async function (req, res) {
//   console.log("Got request for /");

//   const Arts = await myDB.getArts();

//   // render the _index_ template with the Arts attrib as the list of Arts
//   res.render("index", { Arts: Arts });
// });
/* GET home page. */
router.get("/", async function (req, res) {
  const Arts = await myDB.getArts();
  res.render("index", { Arts: Arts });
});

/* GET fire details. */
router.get("/Arts/:fireID", async function (req, res) {
  console.log("Got fire details");

  const fireID = req.params.fireID;

  const fire = await myDB.getFireByID(fireID);

  res.render("fireDetails", { fire: fire });
});

/* POST update artworks. */
router.post("/Arts/update", async function (req, res) {
  console.log("Got artworks.");

  //const fireID = req.params.fireID;
  const fire2 = req.body;

  console.log("gotfire details ", fire2);

  await myDB.updateArtworks(fire2);

  console.log("artworks update");

  res.render("fireDetails", { fire: fire2 });
});

/* POST create Arts. */
router.post("/Arts/create", async function (req, res) {
  console.log("Got post create/Arts");

  const fire = req.body;

  console.log("got create fire", fire);

  await myDB.createFire(fire);

  console.log("Fire created");

  res.redirect("/");
});

/* POST delete Arts. */
router.post("/Arts/delete", async function (req, res) {
  console.log("Got post delete Art");

  const fire = req.body;

  console.log("got delete Art", fire);

  await myDB.deleteArt(fire);

  console.log("Art deleted");

  res.redirect("/");
});

module.exports = router;
