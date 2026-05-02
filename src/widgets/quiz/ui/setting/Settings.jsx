import { useDispatch, useSelector } from 'react-redux';
import { setScreen, setDifficulty } from '@/entities/quiz-session/model/quizUISlice';
import { selectDifficulty } from '@/entities/quiz-session/model/selectors';
import { DIFFICULTY } from '@/entities/quiz-session/model/config/difficultyConfig';

const Settings = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector(selectDifficulty);

  return (
    <div className="settings">
      <h2>Выбор сложности</h2>

      <button
        className={difficulty === DIFFICULTY.EASY ? 'active' : ''}
        onClick={() => dispatch(setDifficulty(DIFFICULTY.EASY))}
      >
        Легко — меньше карточек, меньше вопросов
      </button>

      <button
        className={difficulty === DIFFICULTY.MEDIUM ? 'active' : ''}
        onClick={() => dispatch(setDifficulty(DIFFICULTY.MEDIUM))}
      >
        Средне — сбалансированный режим
      </button>

      <button
        className={difficulty === DIFFICULTY.HARD ? 'active' : ''}
        onClick={() => dispatch(setDifficulty(DIFFICULTY.HARD))}
      >
        Сложно — максимум карточек и вопросов
      </button>

      <button onClick={() => dispatch(setScreen('menu'))}>
        Назад
      </button>
    </div>
  );
};

export default Settings;