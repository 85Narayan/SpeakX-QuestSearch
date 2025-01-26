import * as grpcWebClient from '../grpc/questions_grpc_web_pb.js';
import { SearchRequest } from '../grpc/questions_pb.js';


const client = new grpcWebClient.QuestionServiceClient('http://localhost:8080');

const searchQuestions = async (query, page = 1) => {
    return new Promise((resolve, reject) => {
        const request = new SearchRequest();
        request.setQuery(query);
        request.setPage(page);

        client.searchQuestions(request, {}, (err, response) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(response.toObject());
            }
        });
    });
};

// module.exports = { searchQuestions };
export default searchQuestions;

