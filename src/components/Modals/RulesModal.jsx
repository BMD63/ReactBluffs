import Button from '../Shared/Button';

const RulesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Правила игры</h2>
        <p>{`Отвечайте на вопросы,бонусные баллы удваивают очки за вопрос 
          при правильном ответе, при неправильном ответе не учитываютсяи.
          Старайтесь набрать максимум очков!`}</p>
        <Button onClick={onClose}>Начать игру</Button>
      </div>
    </div>
  );
};

export default RulesModal;