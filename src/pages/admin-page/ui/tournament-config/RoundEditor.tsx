import type { TournamentRoundConfig } from '@/entities/tournament-config';

type RoundEditorProps = {
  round: TournamentRoundConfig;
};

const formatOptionalValue = (value: number | undefined) => {
  return typeof value === 'number' ? value : '—';
};

const RoundEditor = ({ round }: RoundEditorProps) => {
  return (
    <section className="admin-round-editor">
      <h3>Edit round</h3>

      <div className="admin-round-editor__section">
        <h4>General</h4>

        <dl className="admin-round-editor__details">
          <div>
            <dt>Title</dt>
            <dd>{round.title}</dd>
          </div>

          <div>
            <dt>Type</dt>
            <dd>{round.type}</dd>
          </div>

          <div>
            <dt>Difficulty</dt>
            <dd>{round.difficulty}</dd>
          </div>
        </dl>
      </div>

      <div className="admin-round-editor__section">
        <h4>Questions</h4>

        <dl className="admin-round-editor__details">
          <div>
            <dt>Questions count</dt>
            <dd>{round.questionsCount}</dd>
          </div>
        </dl>
      </div>

      <div className="admin-round-editor__section">
        <h4>Timing</h4>

        <dl className="admin-round-editor__details">
          <div>
            <dt>Question time</dt>
            <dd>{round.questionTimeSeconds} sec</dd>
          </div>

          <div>
            <dt>Correction time</dt>
            <dd>{round.correctionTimeSeconds} sec</dd>
          </div>
        </dl>
      </div>

      <div className="admin-round-editor__section">
        <h4>Bonus</h4>

        <dl className="admin-round-editor__details">
          <div>
            <dt>Bonus answers limit</dt>
            <dd>{formatOptionalValue(round.bonusAnswersLimit)}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default RoundEditor;
