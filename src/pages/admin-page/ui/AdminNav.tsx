type AdminSection = 'home' | 'questions' | 'tournamentConfig';

type AdminNavProps = {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
};

const AdminNav = ({ activeSection, onSectionChange }: AdminNavProps) => {
  return (
    <nav className="admin-nav" aria-label="Admin navigation">
      <button
        type="button"
        className={
          activeSection === 'home'
            ? 'admin-nav__item admin-nav__item--active'
            : 'admin-nav__item'
        }
        onClick={() => onSectionChange('home')}
      >
        Home
      </button>

      <button
        type="button"
        className={
          activeSection === 'questions'
            ? 'admin-nav__item admin-nav__item--active'
            : 'admin-nav__item'
        }
        onClick={() => onSectionChange('questions')}
      >
        Questions
      </button>

      <button
        type="button"
        className={
          activeSection === 'tournamentConfig'
            ? 'admin-nav__item admin-nav__item--active'
            : 'admin-nav__item'
        }
        onClick={() => onSectionChange('tournamentConfig')}
      >
        Tournament config
      </button>
    </nav>
  );
};

export default AdminNav;
