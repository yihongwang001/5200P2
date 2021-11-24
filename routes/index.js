let express = require("express");
let router = express.Router();

const myDB = require("../db/MySqliteDB.js");

/* GET home page. */
router.get("/", async function (req, res) {
  const Arts = await myDB.getArts();
  res.render("index", { Arts: Arts });
});

/* GET art details. */
router.get("/Arts/:artID", async function (req, res) {
  console.log("Got art details");
  const artworkID = req.params.artID;
  const art = await myDB.getArtByID(artworkID);
  res.render("artDetails", { f: art });
});

/* POST update artworks. */
router.post("/Arts/update", async function (req, res) {
  console.log("Got artworks.");
  const art = req.body;
  await myDB.updateArtworks(art);
  const artworkID = art.artworkID;
  const arts = await myDB.getArtByID(artworkID);
  res.render("artDetails", { f: arts });
});

/* POST create Arts. */
router.post("/Arts/create", async function (req, res) {
  const art = req.body;
  await myDB.createArt(art);
  console.log("Art created");
  res.redirect("/");
});

/* POST delete Arts. */
router.post("/Arts/delete", async function (req, res) {
  console.log("Got post delete Art");
  const art = req.body;
  await myDB.deleteArt(art);
  console.log("Art deleted");
  res.redirect("/");
});

module.exports = router;
