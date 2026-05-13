import { GAME_MODE } from '@/entities/game-mode';
import { Button } from '@/shared/ui/button';
import type { GameMode } from '@/entities/game-mode';

import './mode-selection-screen.css';

type ModeSelectionScreenProps = {
  onSelectMode: (
    mode: GameMode
  ) => void;

  onBack: () => void;
};

const ModeSelectionScreen = ({
  onSelectMode,
  onBack,
}: ModeSelectionScreenProps) => {
  return (
    <section className="mode-selection">
      <div className="mode-selection__header">
        <p className="mode-selection__eyebrow">
          ReactBluffs
        </p>

        <h1 className="mode-selection__title">
          Выберите режим игры
        </h1>

        <p className="mode-selection__description">
          Каждый режим предлагает свой стиль
          вопросов и правила.
        </p>
      </div>

      <div className="mode-selection__grid">
        <article className="mode-card mode-card--active">
          <div className="mode-card__icon">
            🎭
          </div>

          <h2>Bluff Quiz</h2>

          <p>
            Отвечайте «да» или «нет» и
            пытайтесь запутать соперников.
          </p>

          <Button
            variant="primary"
            onClick={() =>
              onSelectMode(
                GAME_MODE.BLUFF
              )
            }
          >
            Играть
          </Button>
        </article>

        <article className="mode-card">
          <div className="mode-card__icon">
            🧠
          </div>

          <h2>Multiple Choice</h2>

          <p>
            Выберите один правильный
            ответ из нескольких.
          </p>

          <Button
            variant="secondary"
            disabled
          >
            Скоро
          </Button>
        </article>

        <article className="mode-card">
          <div className="mode-card__icon">
            🎧
          </div>

          <h2>Open Answer</h2>

          <p>
            Текстовые, визуальные и
            аудио-вопросы.
          </p>

          <Button
            variant="secondary"
            disabled
          >
            Скоро
          </Button>
        </article>
      </div>
      <div className="mode-selection__actions">
          <Button
            variant="secondary"
            onClick={onBack}
          >
            ← Назад
          </Button>
        </div>
    </section>
  );
};

export default ModeSelectionScreen;