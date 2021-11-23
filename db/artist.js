const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";

// List out all artist records
async function getArtists() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artistsCollection = db.collection("Artists");
    const query = {};
    return await artistsCollection
      .find(query)
      .toArray()
      .finally(() => client.close());
  } catch (err) {
    console.log("error", err);
  }
}

// Create an artist record
// async function createArtist(newArtist) {
//   try {
//     const db = await connect();

//     const stmt = await db.prepare(`INSERT INTO
//       Artists(Name, birthYear, deathYear, nationalityID, description)
//       VALUES (:Name, :birthYear, :deathYear, (SELECT nationalityID FROM Nationality WHERE name=:nationalityName), :description)
//     `);
//     console.log("got create artist", newArtist.Name);

//     stmt.bind({
//       ":Name": newArtist.Name,
//       ":birthYear": newArtist.birthYear,
//       ":deathYear": newArtist.deathYear,
//       ":nationalityName": newArtist.nationalityName,
//       ":description": newArtist.description,
//     });

//     return await stmt.run();
//   } catch(e) {
//     return console.error(e.message);
//   }
// }

// // Update an artist record
// async function updateArtist(newArtist) {
//   try {
//     const db = await connect();

//     const stmt = await db.prepare(`UPDATE Artists
//       SET Name = :Name, birthYear = :birthYear, deathYear = :deathYear, nationalityID = (SELECT nationalityID FROM Nationality WHERE Nationality.name LIKE :nationalityName), description = :description
//       WHERE artistID = :artistID;
//     `);
//     console.log("got updateArtist", newArtist.Name);

//     stmt.bind({
//       ":artistID": newArtist.artistID,
//       ":Name": newArtist.Name,
//       ":birthYear": newArtist.birthYear,
//       ":deathYear": newArtist.deathYear,
//       ":nationalityName": newArtist.nationalityName,
//       ":description": newArtist.description,
//     });

//     console.log("got bind", newArtist.Name);

//     return await stmt.run();
//   } catch (e) {
//     return console.error(e.message);
//   }
// }

// Get Artist Record by ID
async function getArtistByID(artistID) {
  // try {
  //   const db = await connect();

  //   let sql_query = `SELECT Artists.artistID, Artists.Name, Artists.birthYear, Artists.deathYear, Nationality.name AS nationalityName, Nationality.region, Artists.description FROM Artists, Nationality Where Artists.artistID = :artistID and Artists.nationalityID = Nationality.nationalityID`
  //   const stmt = await db.prepare(sql_query);

  //   stmt.bind({
  //     ":artistID": artistID,
  //   });

  //   return await stmt.get();
  // } catch (e) {
  //   return console.error(e.message);
  // }
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Arts");
    const artistsCollection = db.collection("Artists");
    const query = { artistID: artistID };
    return await artistsCollection
      .find(query)
      .toArray()
      .finally(() => client.close());
  } catch (err) {
    console.log("error", err);
  }
}

// // Delete Artist Record
// async function deleteArtist(artistToDelete) {
//   try {
//     const db = await connect();

//     const stmt = await db.prepare(`DELETE FROM
//       Artists
//       WHERE artistID = :IDToDelete
//     `);

//     stmt.bind({
//       ":IDToDelete": artistToDelete.artistID,
//     });

//     return await stmt.run();
//   } catch (e) {
//     return console.error(e.message);
//   }
// }

module.exports.getArtists = getArtists;
// module.exports.createArtist = createArtist;
// module.exports.deleteArtist = deleteArtist;
module.exports.getArtistByID = getArtistByID;
// module.exports.updateArtist = updateArtist;
