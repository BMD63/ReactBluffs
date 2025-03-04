import Button from '../Shared/Button';
import PropTypes from 'prop-types';
import './styles.css';
import { useEffect } from 'react';

const Card = ({ cardData, cardIndex, userAnswers, onAnswer, onBonus, onSubmit,totalCards }) => {
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
      <h2>РАУНД {stringCartIndexes[cardIndex]} ИЗ {stringTotalCards[totalCards]}</h2>
      {cardData.map((question, questionIndex) => (
        <div key={questionIndex} className="question">
          <p>{question.question}</p>
          <div className="controls">
            <Button
              className={`answer-btn ${userAnswers[questionIndex]?.answer === true ? 'selected' : ''}`}
              onClick={() => onAnswer(cardIndex, questionIndex, true)}
            >
              Да
            </Button>
            <Button
              className={`answer-btn ${userAnswers[questionIndex]?.answer === false ? 'selected' : ''}`}
              onClick={() => onAnswer(cardIndex, questionIndex, false)}
            >
              Нет
            </Button>
            <label className="bonus-label">
              <input
                type="checkbox"
                disabled={
                  Object.values(userAnswers)
                    .filter(a => a.bonus).length >= 3 && 
                  !userAnswers[questionIndex]?.bonus
                }
                checked={userAnswers[questionIndex]?.bonus || false}
                onChange={() => onBonus(cardIndex, questionIndex)}
              />
              Бонусный балл
            </label>
          </div>
        </div>
      ))}
      <Button 
        className="submit-btn"
        disabled={!allQuestionsAnswered}
        onClick={onSubmit}
      >
        Ответить
      </Button>
    </div>
  );
};
Card.propTypes = {
  cardData: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
    })
  ).isRequired,
  cardIndex: PropTypes.number.isRequired,
  userAnswers: PropTypes.object.isRequired,
  onAnswer: PropTypes.func.isRequired,
  onBonus: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Card;