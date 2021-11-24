let express = require("express");
let router = express.Router();

const myDB = require("../db/artist.js");

/* GET artist home page. */
router.get("/artists", async function (req, res) {
  console.log("Got request for /artists");
  const artists = await myDB.getArtists();

  // render the _artist_ template with the artists attrib as the list of artists
  res.render("artists", { artists});
});

/* GET artist details. */
router.get("/artists/:artistName", async function (req, res) {
  console.log("Got artist");

  const artistName = req.params.artistName;

  const artist = await myDB.getArtistByID(artistName);

  res.render("artistDetails", { artist: artist[0] });
});

/* POST update artworks. */
router.post("/artists/update", async function (req, res) {
  console.log("Update artist.");

  const updateArtist = req.body;

  console.log("gotArtist details", updateArtist);

  await myDB.updateArtist(updateArtist);

  console.log("artist update");

  res.redirect("/artists");
});

/* GET create artist page. */
router.get("/createArtist", async function (req, res) {
  console.log("get create artist.");
  res.render("createArtist");
});

/* POST create artist. */
router.post("/createArtist", async function (req, res) {
  console.log("Got post create/artists");

  const newArtist = req.body;

  console.log("got create artist", newArtist);

  await myDB.createArtist(newArtist);

  console.log("Artist created");

  res.redirect("/artists");
});

/* POST delete Arts. */
router.post("/artists/delete", async function (req, res) {
  console.log("Got post delete artist");

  const artist = req.body;

  console.log("got delete artist", artist);

  await myDB.deleteArtist(artist);

  console.log("Artist deleted");

  res.redirect("/artists");
});

module.exports = router;
