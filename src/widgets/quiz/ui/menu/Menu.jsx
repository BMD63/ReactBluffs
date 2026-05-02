import { useDispatch } from 'react-redux';
import { setScreen, setShowRules } from '@/entities/quiz-session/model/quizUISlice';
import { initGame } from '@/entities/quiz-session/model/thunks/initGame';
import { initUI } from '@/entities/quiz-session/model/thunks/initUI';

const Menu = () => {
  const dispatch = useDispatch();

  const handleStart = () => {
    dispatch(setScreen('game'));
    dispatch(initGame());
    dispatch(initUI());
  };

  return (
    <div className="menu">
      <h1>QUIZ</h1>

      <button onClick={handleStart}>
        Начать
      </button>

      <button onClick={() => dispatch(setShowRules(true))}>
        Показать правила
      </button>

      {/* 👇 скоро добавим */}
      <button disabled>
        Выбрать сложность
      </button>
    </div>
  );
};

export default Menu;