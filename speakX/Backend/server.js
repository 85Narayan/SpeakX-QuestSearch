const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { searchQuestions } = require('./controllers/questionController');

dotenv.config();

// Load protobuf
const PROTO_PATH = './proto/questions.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});
const questionsProto = grpc.loadPackageDefinition(packageDefinition).questions;

// Function to connect to MongoDB and start the server
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        // Setup gRPC server
        const server = new grpc.Server();
        server.addService(questionsProto.QuestionService.service, {
            SearchQuestions: searchQuestions,
        });

        const PORT = process.env.GRPC_PORT || '50051';
        server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
            console.log(`gRPC server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

// Start the server
startServer();
