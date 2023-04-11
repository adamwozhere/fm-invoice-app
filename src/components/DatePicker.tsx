import { MouseEventHandler, useEffect, useId, useMemo, useState } from 'react';
import CalendarIcon from './icons/CalendarIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

export default function DatePicker() {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [selectedMonth, setSelectedMonth] = useState(0);

  const [dateValue, setDateValue] = useState(new Date());
  // const [calendarArray, setCalendarArray] = useState<number[][]>([]);

  console.log('date is', dateValue.toString());

  const toggleCalendar = () => {
    setIsExpanded(!isExpanded);
  };

  const updateCalendar = (date_: Date) => {
    let date = new Date(date_);
    let day = 1;
    // doesn't account for looping months
    date.setDate(1);
    console.log('current date', date);
    let dayOffset = date.getDay();
    console.log('dayOffset', dayOffset);
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    const lastDayNumber = date.getDate();
    console.log('lastDayNumber', lastDayNumber);
    const arr: number[][] = [];

    do {
      const row = [];
      for (let i = 0; i < 7; i++) {
        if (dayOffset > 0) {
          row.push(0);
          dayOffset--;
        } else {
          if (day > lastDayNumber) {
            row.push(0);
          } else {
            row.push(day);
          }
          day++;
        }
      }
      console.log(row);
      arr.push(row);
    } while (day <= lastDayNumber);
    // setCalendarArray(arr);
    console.log('calendar', arr);
    return arr;
  };

  useEffect(
    () => console.log('date change', dateValue.toString()),
    [dateValue]
  );

  // useEffect(() => updateCalendar(dateValue), [dateValue, offset, lastDayNumber]);
  const calendarArray = useMemo(() => updateCalendar(dateValue), [dateValue]);

  const changeMonth = (month: number) => {
    setDateValue((prev) => {
      let newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + month);
      return newDate;
    });
  };

  const id = useId();

  return (
    <div className="date-picker">
      <label htmlFor={id}>Date</label>
      <div className="group">
        <input
          id={id}
          type="date"
          // pattern="\d{4}-\d{2}-\d{2}"
          placeholder="dd/mm/yyyy"
          value={dateValue.toISOString().split('T')[0]}
          onKeyDown={(event) => event.preventDefault()}
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
      </div>
      {isExpanded && (
        <div className="calendar" aria-label="calendar">
          <div className="date-month">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="previous month"
            >
              <ArrowLeftIcon />
            </button>
            <span>{dateValue.toDateString()}</span>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="next month"
            >
              <ArrowRightIcon />
            </button>
          </div>
          <table role="grid" aria-label="calendar">
            <thead>
              <tr>
                <th role="columnheader" scope="col" abbr="Sunday">
                  S
                </th>
                <th role="columnheader" scope="col" abbr="Monday">
                  M
                </th>
                <th role="columnheader" scope="col" abbr="Tuesday">
                  T
                </th>
                <th role="columnheader" scope="col" abbr="Wednesday">
                  W
                </th>
                <th role="columnheader" scope="col" abbr="Thursday">
                  T
                </th>
                <th role="columnheader" scope="col" abbr="Friday">
                  F
                </th>
                <th role="columnheader" scope="col" abbr="Saturday">
                  S
                </th>
              </tr>
            </thead>
            <tbody>
              {calendarArray.map((row, r) => {
                return (
                  <tr key={r}>
                    {row.map((cell, c) => {
                      return (
                        <td key={c}>
                          {cell !== 0 ? (
                            <button
                              type="button"
                              tabIndex={-1}
                              aria-label="Saturday, April 11, 2023"
                            >
                              {cell}
                            </button>
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
