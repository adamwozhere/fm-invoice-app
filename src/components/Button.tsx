import { MouseEventHandler } from 'react';
import PlusIcon from '@/components/icons/PlusIcon';
import Image from 'next/image';
import PlusCircleIcon from './icons/PlusCircleIcon';

interface Props {
  variant?:
    | 'primary'
    | 'primary-plus'
    | 'secondary'
    | 'secondary-plus'
    | 'tertiary'
    | 'warning';
  label?: string;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function Button(props: Props) {
  return (
    <button
      className="button"
      type={props.type ?? 'button'}
      data-variant={props.variant ?? 'primary'}
      onClick={props.onClick}
    >
      {props.variant === 'primary-plus' ||
      props.variant === 'secondary-plus' ? (
        <span>
          <PlusCircleIcon />
        </span>
      ) : null}
      {props.label}
    </button>
  );
}
