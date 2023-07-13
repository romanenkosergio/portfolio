export interface IButtonProps {
  text: string;
  type?: 'primary' | 'default' | 'ghost';
  action?: () => void;
  disabled?: boolean;
  className?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  id?: string;
}
