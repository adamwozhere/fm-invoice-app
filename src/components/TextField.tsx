import { useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ITextFieldProps {
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  fieldProps?: UseFormRegisterReturn;
  error?: string;
  label: string;
  [x: string]: any;
}

// try to use ref instead of the register() to pass all the props including error?

export default function TextField({
  type = 'text',
  placeholder,
  fieldProps,
  error,
  label,
  ...props
}: ITextFieldProps) {
  const id = useId();

  return (
    <div>
      <label className="mb-[9px] text-shsm text-lilac" htmlFor={id + label}>
        {label}
      </label>
      <input
        className="mt-[9px] block w-full rounded border border-mist px-[20px] pb-[15px] pt-[18px] text-hsmv text-onyx"
        id={id + label}
        type={type}
        placeholder={placeholder}
        {...fieldProps}
        {...props}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error ? <span>{error}</span> : null}
    </div>
  );
}
