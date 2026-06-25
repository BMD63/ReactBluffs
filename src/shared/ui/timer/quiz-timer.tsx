import './quiz-timer.css';

type QuizTimerProps = {
  seconds: number;
};

const QuizTimer = ({ seconds }: QuizTimerProps) => {
  const className =
    seconds <= 10
      ? 'quiz-timer quiz-timer--danger'
      : seconds <= 20
        ? 'quiz-timer quiz-timer--warning'
        : 'quiz-timer';

  return <div className={className}>⏳ {seconds} сек.</div>;
};

export default QuizTimer;
