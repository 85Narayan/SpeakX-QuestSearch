const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Question = require('./models/question');

dotenv.config();

const loadData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        // Read JSON data from file
        const rawData = fs.readFileSync('./questions.json');
        const parsedData = JSON.parse(rawData);

        // Process data to remove "$oid" wrapping from ObjectIds
        const data = parsedData.map(q => ({
            _id: q._id?.$oid || q._id,  // Handle MongoDB ObjectId conversion
            type: q.type,
            anagramType: q.anagramType || null,
            blocks: q.blocks || [],
            options: q.options || [],
            siblingId: q.siblingId?.$oid || q.siblingId || null,  // Handle siblingId safely
            solution: q.solution || null,
            title: q.title
        }));

        // Remove old records and insert new data
        await Question.deleteMany({});
        await Question.insertMany(data);

        console.log('Data successfully loaded into the database');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error loading data:', error);
        process.exit(1);
    }
};

// Run the data loading function
loadData();
