import Button from '../Shared/Button';

const RulesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Правила игры</h2>
        <p>{`Отвечайте на вопросы следующим образом: если согласны с утверждением, то "Да"
          если не согласны с утверждением, то "Нет". Бонусные баллы удваивают очки за вопрос 
          при правильном ответе, при неправильном ответе не учитываютсяи.`}</p>
        <p>{`Можно выбрать не более 3-х бонусных баллов на карточку.`}</p>
        <p></p>
        <p>Если правильно ответь на все вопросы, то в конце покажут мультик</p>
        <Button onClick={onClose}>Начать игру</Button>
      </div>
    </div>
  );
};

export default RulesModal;