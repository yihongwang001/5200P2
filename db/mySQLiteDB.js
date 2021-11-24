const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";

async function getArts() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artworkCollection = db.collection("artworks");
    const query = {};
    return await artworkCollection
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
    const artworkCollection = db.collection("artworks");
    const query = {};
    return await artworkCollection
      .find(query)
      .count()
      .finally(() => client.close());
  } catch (err) {
    console.log("error", err);
  }
}

async function createArt(newArt) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artworkCollection = db.collection("artworks");
    const query = {
      artistID: newArt.artistID,
      artworkID: (await getArtCount()) + 1,
      galleryID: Number(newArt.galleryID),
      name: newArt.name,
      year: Number(newArt.year),
      movement: { name: newArt.movement },
      status: { statusType: newArt.status },
    };
    return await artworkCollection
      .insertOne(query)
      .finally(() => client.close());
  } catch (err) {
    console.log("error", err);
  }
}

async function updateArtworks(newArt) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artworkCollection = db.collection("artworks");
    return await artworkCollection.updateOne(
      {
        artworkID: Number(newArt.artworkID),
      },
      {
        $set: {
          artistID: newArt.artistID,
          galleryID: Number(newArt.galleryID),
          name: newArt.name,
          year: Number(newArt.year),
          movement: { name: newArt.movement },
          status: { statusType: newArt.status },
        },
      }
    );
  } finally {
    client.close();
  }
}

async function getArtByID(artworkID) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artworkCollection = db.collection("artworks");
    const query = { artworkID: Number(artworkID) };
    return await artworkCollection.findOne(query).finally(() => client.close());
  } catch (err) {
    console.log("error", err);
  }
}

async function deleteArt(artToDelete) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artworkCollection = db.collection("artworks");
    const query = { artworkID: Number(artToDelete.artworkID) };
    return await artworkCollection
      .deleteOne(query)
      .finally(() => client.close());
  } catch (err) {
    console.log("error", err);
  }
}
module.exports.getArts = getArts;
module.exports.createArt = createArt;
module.exports.deleteArt = deleteArt;
module.exports.getArtByID = getArtByID;
module.exports.updateArtworks = updateArtworks;
