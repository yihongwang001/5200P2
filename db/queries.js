const { query } = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb://localhost:27017";

//At least one query must contain an aggregation
async function query1() {
    let db;
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        db = client.db("Arts");
        const artistsCollection = db.collection("artists");

        const aggregation = [
            { $group: { _id: "$nationality.region", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ];
        const res = await artistsCollection
            .aggregate(aggregation)
            .limit(1)
            .toArray();
        console.log(
            "Query 1: The region with the most artists from artists collection is: ",
            res
        );
    } catch (err) {
        console.log("error", err);
    } finally {
        await client.close();
    }
}

//one must contain a complex search criterion (more than one expression with logical connectors)
async function query2() {
    let db;
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        db = client.db("Arts");
        const artistsCollection = db.collection("artists");

        const aggregation = [
            { $group: { _id: "$nationality.name", count: { $sum: 1 } } },
            { $match: { count: { $gt: 1 } } },
            { $sort: { count: -1 } },
        ];
        const res = await artistsCollection.aggregate(aggregation).toArray();
        console.log(
            "Query 2: The list of nations where at least two artists are from the nationality is: ",
            res
        );
    } catch (err) {
        console.log("error", err);
    } finally {
        await client.close();
    }
}

//one should be counting documents for an specific user
async function query3() {
    let db;
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        db = client.db("Arts");
        const artistsCollection = db.collection("artworks");

        const query = {
            $or: [
                { "status.statusType": "In Maintenance" },
                { "status.statusType": "Inactive" },
            ],
        };
        const res = await artistsCollection.find(query).count();
        console.log(
            "Query 3: Count of Artworks that are currently inactive or in maintenance: ",
            res
        );
    } catch (err) {
        console.log("error", err);
    } finally {
        await client.close();
    }
}
// one must be updating a document based on a query parameter
// assume we want to update the status.statusType of the record whose artworkID is 14
async function query4(artworkID) {
    //assume parameter artworkID is 14
    let db;
    artworkID = 14;
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        db = client.db("Arts");
        const artworkCollection = db.collection("artworks");
        const query = { artworkID: Number(artworkID) };
        //get the statusType before update
        const res = await artworkCollection.findOne(query);
        console.log(
            "query 4: statusType of the artwork whose artworkID is 14 before update:",
            res.status.statusType
        );
        const ans = await artworkCollection.updateOne(
            {
                artworkID: Number(artworkID),
            },
            {
                $set: {
                    status: { statusType: "nullStatus" },
                },
            }
        );
        //get the statusType after update
        const res2 = await artworkCollection.findOne(query);
        console.log(
            "query 4: statusType of the artwork whose artworkID is 14 after update:",
            res2.status.statusType
        );
    } finally {
        client.close();
    }
}

// find the artwork whose production year is later than 1900
async function query5() {
    let db;
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        db = client.db("Arts");
        const artworkCollection = db.collection("artworks");

        const query = {
            year: { $gt: 1900, $lt: 1913 },
        };
        const res = await artworkCollection.find(query).toArray();
        console.log(
            "Query 5: find the artwork whose production year is later than 1900 ",
            res
        );
    } catch (err) {
        console.log("error", err);
    } finally {
        await client.close();
    }
}

module.exports.query1 = query1;
module.exports.query2 = query2;
module.exports.query3 = query3;
module.exports.query4 = query4;
module.exports.query5 = query5;

query1();
query2();
query3();
query4();
query5();
