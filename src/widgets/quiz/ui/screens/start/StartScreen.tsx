import { Button } from '@/shared/ui/button';

import './start-screen.css';

type StartScreenProps = {
  onStart: () => void;
};

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <section className="start-screen">
      <div className="start-screen__content">
        <p className="start-screen__eyebrow">ReactBluffs</p>

        <h1 className="start-screen__title">
          Викторины, где знания встречаются с интуицией
        </h1>

        <p className="start-screen__description">
          Выбирайте режим, проверяйте факты и набирайте очки.
        </p>

        <Button variant="primary" onClick={onStart}>
          Начать
        </Button>
      </div>
    </section>
  );
};

export default StartScreen;