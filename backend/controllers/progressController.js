import Document from '../models/Document.js';
import Flashcard from '../models/Flashcard.js';
import Quiz from '../models/Quiz.js';

//@desc get user learning stats
//@route GET /api/progress/dashboard
//@access Private
export const getDashboard = async (req, res, next) => {
    try {
        const userId = req.user._id;

        //get counts
        const totalDocuments = await Document.countDocuments({ userId });
        const totalFlashcardSets = await Flashcard.countDocuments({  userId });
        const totalQuizzes = await Quiz.countDocuments({
    userId
});

const completedQuizzes = await Quiz.countDocuments({
    userId,
    completedAt: { $ne: null }
});

        //get flashcard stats
        const flashcardSets = await Flashcard.find({ userId });
        let totalFlashcards = 0;
        let reviewedFlashcards = 0;
        let starredFlashcards = 0;

        flashcardSets.forEach(set => {
            totalFlashcards += set.cards.length;
            reviewedFlashcards += set.cards.filter(card => card.reviewCount > 0).length;
            starredFlashcards += set.cards.filter(card => card.isStarred).length;
        });

        // get quiz stats
        const quizzes = await Quiz.find({ userId, completedAt: { $ne: null } });
        const averageScore = quizzes.length > 0
            ? Math.round(quizzes.reduce((sum, quiz) => sum + quiz.score, 0) / quizzes.length)
            : 0;

        //recent activity
        const recentDocuments = await Document.find({ userId }).sort({ lastAccessed: -1 }).limit(5).select('title lastAccessed');

        const recentQuizzes = await Quiz.find({ userId, completedAt: { $ne: null } }).sort({ completedAt: -1 }).limit(5).populate('documentId', 'title').select('title score totalQuestions completedAt');

        // study streak (track daily activity)
        const studyStreak = Math.floor(Math.random() * 7) + 1; // Placeholder for actual streak calculation

        console.log("===== DASHBOARD =====");
console.log("Documents:", totalDocuments);
console.log("Flashcard Sets:", totalFlashcardSets);
console.log("Total Flashcards:", totalFlashcards);
console.log("Total Quizzes:", totalQuizzes);
console.log("Completed Quizzes:", completedQuizzes);
console.log("Recent Documents:", recentDocuments.length);
console.log("Recent Quizzes:", recentQuizzes.length);

        res.json({
            success: true,
            data: {
                overview: {
                    totalDocuments,
                    totalFlashcardSets,
                    totalFlashcards,
                    reviewedFlashcards,
                    starredFlashcards,
                    totalQuizzes,
                    completedQuizzes,
                    averageScore,
                    studyStreak
                },
                recentActivity: {
                    documents: recentDocuments,
                    quizzes: recentQuizzes
                }
            }
        });
    } catch (error) {
       next(error);
    }
};
