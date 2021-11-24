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

async function getArtCount() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artistsCollection = db.collection("artworks");
    const query = {};
    return await artistsCollection
      .find(query)
      .count()
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
      artistID: Number(newFire.artistID),
      artworkID: (await getArtCount()) + 1,
      galleryID: Number(newFire.galleryID),
      name: newFire.name,
      year: Number(newFire.year),
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
    return await artistsCollection.updateOne(
      {
        artworkID: newFire.artworkID,
      },
      {
        $set: {
          artistID: newFire.artistID,
          galleryID: newFire.galleryID,
          name: newFire.name,
          year: newFire.year,
          movement: { name: newFire.movement },
          status: { statusType: newFire.status },
        },
      }
    );
  } finally {
    client.close();
  }
}

async function getFireByID(artworkID) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artistsCollection = db.collection("artworks");
    const query = { artworkID: Number(artworkID) };
    console.log("artworkID");
    console.log(artworkID);
    return await artistsCollection.findOne(query).finally(() => client.close());
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
