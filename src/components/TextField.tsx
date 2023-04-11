import { useId } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface ITextFieldProps {
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  fieldProps: UseFormRegisterReturn;
  error?: string;
  label: string;
}

// try to use ref instead of the register() to pass all the props including error?

export default function TextField({
  type = 'text',
  placeholder,
  fieldProps,
  error,
  label,
}: ITextFieldProps) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id + label}>{label}</label>
      <input
        id={id + label}
        type={type}
        placeholder={placeholder}
        {...fieldProps}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error ? <span>{error}</span> : null}
    </div>
  );
}
