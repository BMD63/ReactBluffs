import Button from '@/shared/ui/button/Button';
import PropTypes from 'prop-types';
import './styles.css';
import { useEffect } from 'react';

const Card = ({ cardData, cardIndex, userAnswers, onAnswer, onBonus, onSubmit, totalCards, onRestart }) => {
  const allQuestionsAnswered = Object.keys(userAnswers).length === 7;
  useEffect(() => {
    window.scrollTo(0, 0);
  }
  , [cardIndex]);
  const stringCartIndexes = [
    `ПЕРВЫЙ`,
    `ВТОРОЙ`,
    `ТРЕТИЙ`,
    `ЧЕТВЕРТЫЙ`,
    `ПЯТЫЙ`,
    `ШЕСТОЙ`,
    `СЕДМОЙ`,
    `ВОСЬМОЙ`,
    `ДЕВЯТЫЙ`,
    `ДЕСЯТЫЙ`,
  ];

  const stringTotalCards = [`ОДНОЙ`, `ДВУХ`, `ТРЕХ`, `ЧЕТЫРЕХ`, `ПЯТИ`, `ШЕСТИ`, `СЕМИ`, `ВОСЬМИ`, `ДЕВЯТИ`, `ДЕСЯТИ`]; 

  return (
    <div className="card">
      <h2>РАУНД {stringCartIndexes[cardIndex]} ИЗ {stringTotalCards[totalCards-1]}</h2>
      {cardData.map((question) => (
        <div key={question.id} className="question">
          <p>{question.text}</p>
          <div className="controls">
            <Button
              className={`answer-btn ${userAnswers[question.id]?.answer === true ? 'selected' : ''}`}
              onClick={() => onAnswer(cardIndex, question.id, true)}
            >
              Да
            </Button>
            <Button
              className={`answer-btn ${userAnswers[question.id]?.answer === false ? 'selected' : ''}`}
              onClick={() => onAnswer(cardIndex, question.id, false)}
            >
              Нет
            </Button>
            <label className="bonus-label">
              <input
                type="checkbox"
                disabled={
                  Object.values(userAnswers)
                    .filter(a => a.bonus).length >= 3 && 
                  !userAnswers[question.id]?.bonus
                }
                checked={userAnswers[question.id]?.bonus || false}
                onChange={() => onBonus(cardIndex, question.id)}
              />
              Бонусный балл
            </label>
          </div>
        </div>
      ))}
      <div className="card-actions">
        <Button 
          className="submit-btn"
          disabled={!allQuestionsAnswered}
          onClick={onSubmit}
        >
          Ответить
        </Button>

        {cardIndex > 0 && (
          <Button 
            className="restart-btn"
            onClick={onRestart}
          >
            Начать сначала
          </Button>
        )}
      </div>
    </div>
  );
};
Card.propTypes = {
  cardData: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  cardIndex: PropTypes.number.isRequired,
  userAnswers: PropTypes.objectOf(
  PropTypes.shape({
    answer: PropTypes.bool,
    bonus: PropTypes.bool,
  })
).isRequired,
  onAnswer: PropTypes.func.isRequired,
  onBonus: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Card;