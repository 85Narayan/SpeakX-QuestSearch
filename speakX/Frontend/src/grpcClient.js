import * as grpcWebClient from '../grpc/questions_grpc_web_pb';

const client = new grpcWebClient.default.QuestionServiceClient('http://localhost:8080');


// Initialize the gRPC-Web client with Envoy proxy URL
// const client = new QuestionServiceClient('http://localhost:8080', null, null);

export const searchQuestions = async (query, page = 1) => {
    return new Promise((resolve, reject) => {
        const request = new SearchQuestionsRequest();
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
