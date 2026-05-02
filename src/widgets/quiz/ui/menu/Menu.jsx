import { useDispatch, useSelector } from 'react-redux';
import { setDifficulty } from '@/entities/quiz-session/model/quizUISlice';
import { selectDifficulty } from '@/entities/quiz-session/model/selectors';
import { DIFFICULTY } from '@/entities/quiz-session/model/config/difficultyConfig';
import { setScreen, setShowRules } from '@/entities/quiz-session/model/quizUISlice';
import { initGame } from '@/entities/quiz-session/model/thunks/initGame';
import { initUI } from '@/entities/quiz-session/model/thunks/initUI';

const Menu = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector(selectDifficulty);
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
      
      <button onClick={() => dispatch(setScreen('settings'))}>
        Выбрать сложность
      </button>
    </div>
  );
};

export default Menu;