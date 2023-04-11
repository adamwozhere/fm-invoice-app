import { useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ISelectFieldProps {
  label: string;
  options: { value: number | string; label: string }[];
  fieldProps: UseFormRegisterReturn;
  error?: string;
  defaultValue: number;
}

export default function SelectField({
  options,
  label,
  fieldProps,
  error,
  defaultValue,
}: ISelectFieldProps) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        {...fieldProps}
        aria-invalid={error ? 'true' : 'false'}
        defaultValue={defaultValue}
      >
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span>{error}</span> : null}
    </div>
  );
}
