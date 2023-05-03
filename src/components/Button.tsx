import { MouseEventHandler } from 'react';

interface Props {
  variant?: 'primary' | 'secondary' | 'warning';
  label?: string;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
}

const colors = {
  primary: 'bg-violet hover:bg-crocus text-white',
  secondary: 'bg-frost hover:bg-mist text-lilac',
  warning: 'bg-watermelon hover:bg-salmon text-white',
};

export default function Button(props: Props) {
  if (props.variant === undefined) {
    // props.variant = 'primary';
  }
  const colorClasses = colors[props.variant];

  return (
    <button
      className={`inline-flex items-center rounded-full px-6 py-2 align-middle text-hsmv transition-colors before:h-8 ${colorClasses}`}
      type={props.type ?? 'button'}
      data-variant={props.variant ?? 'primary'}
      onClick={props.onClick}
    >
      {props.icon && <span className="-ml-4 mr-4">{props.icon}</span>}
      {props.label}
    </button>
  );
}
