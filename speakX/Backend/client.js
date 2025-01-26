const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const readline = require('readline');

const PROTO_PATH = './proto/questions.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});
const questionsProto = grpc.loadPackageDefinition(packageDefinition).questions;

const client = new questionsProto.QuestionService(
    'localhost:50051',
    grpc.credentials.createInsecure()
);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your search query: ', (query) => {
    client.SearchQuestions({ query: query, page: 1 }, (error, response) => {
        if (!error) {
            console.log('Search Results:', response.questions);
        } else {
            console.error('Error:', error);
        }
        rl.close();
    });
});
