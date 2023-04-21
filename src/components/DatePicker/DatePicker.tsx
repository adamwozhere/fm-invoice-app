import { useId, useRef, useState } from 'react';
import CalendarIcon from '../icons/CalendarIcon';
import Calendar from './Calendar';
import { UseFormRegisterReturn, UseFormSetFocus } from 'react-hook-form';

type Props = {
  label: string;
  error?: string;
  fieldProps: UseFormRegisterReturn;
  setFocus: UseFormSetFocus<any>;
};
export default function DatePicker({
  label,
  error,
  fieldProps,
  setFocus,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [dateValue, setDateValue] = useState(new Date());

  // const inputRef = useRef<HTMLInputElement>(null!);

  const toggleCalendar = () => {
    setIsExpanded(!isExpanded);
  };

  const toDayMonthYearString = () => {
    let string = dateValue.toString().split(' ');
    return `${string[2]} ${string[1]} ${string[3]}`;
  };

  const id = useId();

  const myRef = useRef(fieldProps.ref);

  const pickDate = (date: Date) => {
    setDateValue(date);
    setIsExpanded(false);
    setFocus(fieldProps.name);
    console.log('fieldProps ref', fieldProps.ref.toString());
  };

  // console.log('dateFieldPropsRef', { ...fieldProps });

  return (
    <div className="date-picker">
      <label htmlFor={id}>{label}</label>
      <div className="group">
        <input
          className="text-selection-none"
          id={id}
          type="text"
          //inputMode="tel"
          placeholder="dd / mm / yyyy"
          value={toDayMonthYearString()}
          readOnly
          {...fieldProps}
          aria-invalid={error ? 'true' : 'false'}
        />
        <button
          className="toggle-btn"
          type="button"
          onClick={toggleCalendar}
          aria-label="Calendar"
          aria-haspopup="dialog"
          aria-expanded={isExpanded}
        >
          <CalendarIcon />
        </button>
        {error ? <span>{error}</span> : null}
      </div>
      {isExpanded && <Calendar value={dateValue} setValue={pickDate} />}
    </div>
  );
}
