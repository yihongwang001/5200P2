const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://localhost:27017";

async function getArtists() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artistsCollection = db.collection("artists");
    return await artistsCollection
      .find()
      .toArray()
      .finally(() => client.close());
  } catch (err) {
    console.log("error", err);
  }
}

// Create an artist record
async function createArtist(newArtist) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artistsCollection = db.collection("artists");
    const query = {
      name: newArtist.name,
      birthYear: newArtist.birthYear,
      deathYear: newArtist.deathYear,
      nationality: { name: newArtist.nationality, region: newArtist.region },
      description: newArtist.description,
    };
    return await artistsCollection
      .insertOne(query)
      .finally(() => client.close());
  } catch (err) {
    console.log("error", err);
  }
}

// Update an artist record
async function updateArtist(newArtist) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artistsCollection = db.collection("artists");
    const filter = {_id: new ObjectId(newArtist.id)};
    const update = {
      $set: {
        name: newArtist.name,
        birthYear: newArtist.birthYear,
        deathYear: newArtist.deathYear,
        nationality: { name: newArtist.nationality, region: newArtist.region },
        description: newArtist.description
      }
    };
    return await artistsCollection
      .updateOne(filter, update)
      .finally(() => client.close());
  } catch (err) {
    console.log("error", err);
  }
}

// Get Artist Record by ID
async function getArtistByID(artistName) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artistsCollection = db.collection("artists");
    const query = { name: artistName };
    return await artistsCollection
      .find(query)
      .toArray()
      .finally(() => client.close());
  } catch (err) {
    console.log("error", err);
  }
}

// Delete Artist Record
async function deleteArtist(artistToDelete) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artistsCollection = db.collection("artists");
    const query = { _id: new ObjectId(artistToDelete._id) };
    return await artistsCollection
      .deleteOne(query)
      .finally(() => client.close());
  } catch (err) {
    console.log("error", err);
  }
}

module.exports.getArtists = getArtists;
module.exports.createArtist = createArtist;
module.exports.deleteArtist = deleteArtist;
module.exports.getArtistByID = getArtistByID;
module.exports.updateArtist = updateArtist;
