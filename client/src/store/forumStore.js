import { create } from 'zustand';

const useForumStore = create((set, get) => ({
  questions: [],
  
  // Post a new question
  postQuestion: (questionData) => {
    set((state) => ({
      questions: [
        {
          id: Date.now().toString(),
          votes: 0,
          answers: [],
          ...questionData
        },
        ...state.questions
      ]
    }));
  },

  // Post an answer to a question
  postAnswer: (questionId, answerData) => {
    set((state) => ({
      questions: state.questions.map(question => {
        if (question.id === questionId) {
          return {
            ...question,
            answers: [
              ...question.answers,
              {
                id: Date.now().toString(),
                votes: 0,
                ...answerData
              }
            ]
          };
        }
        return question;
      })
    }));
  },

  // Vote on a question
  voteQuestion: (questionId, voteType) => {
    set((state) => ({
      questions: state.questions.map(question => {
        if (question.id === questionId) {
          return {
            ...question,
            votes: question.votes + (voteType === 'up' ? 1 : -1)
          };
        }
        return question;
      })
    }));
  },

  // Vote on an answer
  voteAnswer: (questionId, answerId, voteType) => {
    set((state) => ({
      questions: state.questions.map(question => {
        if (question.id === questionId) {
          return {
            ...question,
            answers: question.answers.map(answer => {
              if (answer.id === answerId) {
                return {
                  ...answer,
                  votes: answer.votes + (voteType === 'up' ? 1 : -1)
                };
              }
              return answer;
            })
          };
        }
        return question;
      })
    }));
  },

  // Subscribe to real-time updates (mock implementation)
  subscribeToUpdates: () => {
    // In a real implementation, this would connect to your backend
    // websocket or real-time database
    console.log('Subscribed to forum updates');
    return () => console.log('Unsubscribed from forum updates');
  }
}));

export default useForumStore; 