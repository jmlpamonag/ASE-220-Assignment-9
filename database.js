const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGO_DB_URI, {
    serverApi: ServerApiVersion.v1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let database;

function connect(callback) {
    client.connect(error => {
        if (error) return console.log(error);

        database = client.db('assignment-nine');

        console.log('MongoDB Database Connected');

        callback();
    });
}

function get() {
    return database;
}

module.exports = { connect, get };