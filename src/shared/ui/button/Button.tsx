import './button.css';

type ButtonVariant = 'primary' | 'secondary' | 'answer' | 'submit' | 'menu';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const Button = ({
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) => {
  const variantClassName = `btn--${variant}`;

  return (
    <button className={`btn ${variantClassName} ${className}`} {...props} />
  );
};

export default Button;
