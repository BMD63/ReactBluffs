import { useState, useEffect } from 'react';
import { questions } from './questions';
import Card from './components/Card';
import RulesModal from './components/Modals/RulesModal';
import CardResultsModal from './components/Modals/CardResultsModal';
import FinalResultsModal from './components/Modals/FinalResultsModal';
import './App.css';

const App = () => {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showRules, setShowRules] = useState(false);
  const [showCardResults, setShowCardResults] = useState(false);
  const [currentCardScore, setCurrentCardScore] = useState(0);

  useEffect(() => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    const questionsCount = shuffledQuestions.length;
    
    // Автоматический расчет количества карточек
    const cardsCount = Math.floor(questionsCount / 7);
    const newCards = [];
    
    for(let i = 0; i < cardsCount; i++) {
      newCards.push(shuffledQuestions.slice(i * 7, (i + 1) * 7));
    }
    setCards(newCards);
    const rulesShown = localStorage.getItem('rulesShown');
    if (!rulesShown) setShowRules(true);
  }, []);
  useEffect(() => {console.log(`userAnswers - ${JSON.stringify(userAnswers)}`)}, [userAnswers]);

  const calculateCurrentCardScore = (cardIndex) => {
    let score = 0;
    cards[cardIndex].forEach((question, questionIndex) => {
      const userAnswer = userAnswers[cardIndex]?.[questionIndex];
      if (userAnswer && userAnswer.answer === question.correctAnswer) {
        score += 1;
        if (userAnswer.bonus) score += 1;
      }
    });
    console.log(`score - ${score}`);
    return score;
  };

  const handleNextCard = () => {
    setShowCardResults(false);
    setCurrentCard(prev => prev + 1);
  };

  const handleAnswerUpdate = (cardIndex, questionIndex, answer) => {
    const newAnswers = [...userAnswers];
    if (!newAnswers[cardIndex]) newAnswers[cardIndex] = {};
    newAnswers[cardIndex][questionIndex] = { 
      answer, 
      bonus: false 
    };
    setUserAnswers(newAnswers);
  };

  const handleBonusUpdate = (cardIndex, questionIndex) => {
    const cardAnswers = userAnswers[cardIndex] || {};
    const currentBonusCount = Object.values(cardAnswers)
      .filter(a => a.bonus).length;

    if (currentBonusCount < 3 || cardAnswers[questionIndex]?.bonus) {
      const newAnswers = [...userAnswers];
      newAnswers[cardIndex][questionIndex].bonus = 
        !newAnswers[cardIndex][questionIndex].bonus;
      setUserAnswers(newAnswers);
    }
  };

  const totalScore = cards.reduce((total, _, index) => 
    total + calculateCurrentCardScore(index), 0
  );

  return (
    <div className="app">
      <RulesModal 
        isOpen={showRules}
        onClose={() => {
          localStorage.setItem('rulesShown', 'true');
          setShowRules(false);
        }}
      />

      {currentCard < cards.length && cards[currentCard] && (
        <Card
          cardData={cards[currentCard]}
          cardIndex={currentCard}
          userAnswers={userAnswers[currentCard] || {}}
          onAnswer={handleAnswerUpdate}
          onBonus={handleBonusUpdate}
          onSubmit={() => {
            setCurrentCardScore(calculateCurrentCardScore(currentCard));
            setShowCardResults(true);
          }}
          totalCards={cards.length}
        />
      )}

      <CardResultsModal
        isOpen={showCardResults}
        cardData={cards[currentCard]}
        cardIndex={currentCard}
        score={currentCardScore}
        onNext={handleNextCard}
        isLastCard={currentCard === cards.length - 1}
        userAnswers={userAnswers[currentCard]}
      />

      <FinalResultsModal
        isOpen={currentCard >= cards.length}
        totalScore={totalScore}
        onRestart={() => {
          setCurrentCard(0);
          setUserAnswers([]);
          window.location.reload();
        }}
      />
    </div>
  );
};

export default App;