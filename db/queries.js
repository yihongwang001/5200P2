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

        const aggregation = [{$group:{_id: "$nationality.region", count:{$sum:1}}}, {$sort:{count:-1}}]
        const res =  await artistsCollection.aggregate(aggregation).limit(1).toArray();
        console.log("Query 1: The region with the most artists from artists collection is: ", res);
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

        const aggregation = [{$group:{_id: "$nationality.name", count:{$sum:1}}}, {$match:{count: {$gt:1}}}, {$sort:{count:-1}}];
        const res =  await artistsCollection.aggregate(aggregation).toArray();
        console.log("Query 2: The list of nations where at least two artists are from the nationality is: ", res);
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

        const query = {$or:[{"status.statusType" :"In Maintenance"},{"status.statusType" :"Inactive"}]};
        const res =  await artistsCollection.find(query).count();
        console.log("Query 3: Count of Artworks that are currently inactive or in maintenance: ", res);
    } catch (err) {
        console.log("error", err);
    } finally {
        await client.close();
    }
}

module.exports.query1 = query1;
module.exports.query2 = query2;
module.exports.query3 = query3;

query1();
query2();
query3();