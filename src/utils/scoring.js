export const LEVEL_THRESHOLDS = {
  BEGINNER: { min: 0, max: 40, label: "Beginner" },
  INTERMEDIATE: { min: 41, max: 75, label: "Intermediate" },
  ADVANCED: { min: 76, max: 100, label: "Advanced" },
};

export function getLevelFromScore(percentage) {
  if (percentage <= 40) return "Beginner";
  if (percentage <= 75) return "Intermediate";
  return "Advanced";
}

export function getPersonalizedExplanation(level, score, correctCount, totalCount) {
  switch (level) {
    case "Advanced":
      return `Outstanding achievement! You demonstrated strong command over advanced grammar nuances, contextual inference, and complex syntax, answering ${correctCount} out of ${totalCount} questions correctly. You are well-positioned for executive communication, academic research rhetoric, and international cohort readiness.`;
    case "Intermediate":
      return `Great performance! You possess a solid foundation in core English grammar, modal constructions, and practical transitions, correctly answering ${correctCount} out of ${totalCount} questions. Strengthening idiomatic precision and advanced stylistic cohesion will elevate your fluency to the next tier.`;
    case "Beginner":
    default:
      return `Good effort on completing the placement assessment! You correctly answered ${correctCount} out of ${totalCount} questions. Focused practice on core sentence structures, fundamental tenses, and high-frequency academic vocabulary will rapidly build your confidence and fluency.`;
  }
}

export function calculateQuizResult(answers = {}, questions = []) {
  const totalQuestions = questions.length || 15;
  let correctCount = 0;
  const itemAnalysis = [];

  questions.forEach((q) => {
    const selectedAnswerIndex = answers[q.id];
    const isAnswered = selectedAnswerIndex !== undefined && selectedAnswerIndex !== null;
    const isCorrect = isAnswered && Number(selectedAnswerIndex) === Number(q.correctAnswer);

    if (isCorrect) {
      correctCount += 1;
    }

    const selectedText = isAnswered && q.options ? q.options[selectedAnswerIndex] : null;
    const correctText = q.options ? q.options[q.correctAnswer] : null;

    itemAnalysis.push({
      questionId: q.id,
      questionText: q.question,
      difficulty: q.difficulty,
      category: q.category,
      options: q.options || [],
      selectedAnswer: isAnswered ? Number(selectedAnswerIndex) : null,
      correctAnswer: Number(q.correctAnswer),
      selectedText,
      correctText,
      isCorrect,
    });
  });

  const rawScore = (correctCount / totalQuestions) * 100;
  const score = Math.round(rawScore);
  const level = getLevelFromScore(score);
  const explanation = getPersonalizedExplanation(level, score, correctCount, totalQuestions);

  return {
    score,
    rawScore,
    correctCount,
    totalQuestions,
    level,
    explanation,
    itemAnalysis,
    submittedAt: new Date().toISOString(),
  };
}
