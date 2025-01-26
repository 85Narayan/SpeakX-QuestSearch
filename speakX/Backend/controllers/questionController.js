const Question = require('../models/question');

// Search questions based on title query
const searchQuestions = async (call, callback) => {
    try {
        const { query, page } = call.request;
        const perPage = 10;

        // Perform a case-insensitive search on the title field
        const questions = await Question.find({
            title: { $regex: query, $options: 'i' },
        })
            .skip((page - 1) * perPage)
            .limit(perPage);

        const total = await Question.countDocuments({
            title: { $regex: query, $options: 'i' },
        });

        // Format the response for gRPC
        const formattedQuestions = questions.map(q => ({
            id: q._id.toString(),
            type: q.type,
            title: q.title
        }));

        callback(null, { questions: formattedQuestions, total });
    } catch (error) {
        console.error('Error:', error);
        callback({ code: 500, message: error.message });
    }
};

module.exports = { searchQuestions };
