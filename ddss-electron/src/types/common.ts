export type ButtonProps = {
  variant: 'text' | 'outlined' | 'contained';
  size: 'small' | 'medium' | 'large';
  title: string;
  disabled: boolean;
  sx: any;
  onClick: () => void;
};
