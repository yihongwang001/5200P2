const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";

async function getArts() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artistsCollection = db.collection("artworks");
    const query = {};
    return await artistsCollection
      .find(query)
      .toArray()
      .finally(() => client.close());
  } catch (err) {
    console.log("error", err);
  }
}

async function createFire(newFire) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artistsCollection = db.collection("artworks");
    const query = {
      artistID: newFire.artistID,
      artworkID: newFire.artworkID,
      galleryID: newFire.galleryID,
      name: newFire.name,
      year: newFire.year,
      movement: { name: newFire.movement },
      status: { statusType: newFire.status },
    };
    return await artistsCollection
      .insertOne(query)
      .finally(() => client.close());
  } catch (err) {
    console.log("error", err);
  }
}

async function updateArtworks(newFire) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artistsCollection = db.collection("artworks");
    const query = {
      artistID: newFire.artistID,
      artworkID: newFire.artworkID,
      galleryID: newFire.galleryID,
      name: newFire.name,
      year: newFire.year,
      movement: { name: newFire.movement },
      status: { statusType: newFire.status },
    };
    return await artistsCollection
      .updateOne(query)
      .finally(() => client.close());
  } catch (err) {
    console.log("error", err);
  }
}

async function getFireByID(artworkID) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artistsCollection = db.collection("artworks");
    const query = { artworkID: artworkID };
    return await artistsCollection
      .find(query)
      .toArray()
      .finally(() => client.close());
  } catch (err) {
    console.log("error", err);
  }
}

async function deleteArt(artToDelete) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artistsCollection = db.collection("artworks");
    const query = { artworkID: artToDelete.artworkID };
    return await artistsCollection
      .deleteOne(query)
      .finally(() => client.close());
  } catch (err) {
    console.log("error", err);
  }
}
module.exports.getArts = getArts;
module.exports.createFire = createFire;
module.exports.deleteArt = deleteArt;
module.exports.getFireByID = getFireByID;
module.exports.updateArtworks = updateArtworks;
