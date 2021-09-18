const { MongoClient } = require('mongodb');

module.exports = class DatabaseService {
    constructor() {
        this.client = new MongoClient(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    get data() {
        return this.client.db('data');
    }

    collection(collectionName) {
        return this.data.collection(collectionName);
    }

    async getUserData(userId) {
        return await this.data.collection('users').findOne({ UserID: `${userId}` });
    }

    start() {
        this.client.connect();
    }
}