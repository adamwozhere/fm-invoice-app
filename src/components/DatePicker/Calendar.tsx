import { useMemo, useState } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';

//Total number of days in a month of a given date
const totalDaysInMonth = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();

  // if February, determine leap year (29 days)
  if (month === 1) {
    if (year % 4 !== 0) return 28;
    if (year % 100 !== 0) return 29;
    if (year % 400 !== 0) return 28;
    return 29;
  }

  // else normal 30 / 31 day month
  if (month < 7) {
    return month % 2 === 0 ? 31 : 30;
  }
  return month % 2 === 0 ? 30 : 31;
};

const toMonthYearString = (date: Date) => {
  let string = date.toString().split(' ');
  return `${string[1]} ${string[3]}`;
};

const NEXT = 1 as const;
const PREVIOUS = -1 as const;

type Props = {
  value: Date;
  // setValue: Dispatch<SetStateAction<Date>>;
  setValue: (date: Date) => void;
};

export default function Calendar({ value, setValue }: Props) {
  const [date, setDate] = useState<Date>(value);

  const tableHead = [
    { label: 'S', name: 'Sunday' },
    { label: 'M', name: 'Monday' },
    { label: 'T', name: 'Tuesday' },
    { label: 'W', name: 'Wednesday' },
    { label: 'T', name: 'Thursday' },
    { label: 'F', name: 'Friday' },
    { label: 'S', name: 'Saturday' },
  ];

  const calendarData = useMemo(() => {
    let newDate = new Date(date);
    newDate.setDate(1);
    let dayOffset = newDate.getDay();
    const lastDayNumber = totalDaysInMonth(newDate);

    const arr: number[][] = [];
    let day = 1;

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
      arr.push(row);
    } while (day <= lastDayNumber);
    return arr;
  }, [date]);

  const changeMonth = (month: number) => {
    setDate((prev) => {
      let newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + month);
      return newDate;
    });
  };

  return (
    <div className="calendar" aria-label="calendar">
      <div className="date-month">
        <button
          type="button"
          onClick={() => changeMonth(PREVIOUS)}
          aria-label="previous month"
        >
          <ArrowLeftIcon />
        </button>
        <span>{toMonthYearString(date)}</span>
        <button
          type="button"
          onClick={() => changeMonth(NEXT)}
          aria-label="next month"
        >
          <ArrowRightIcon />
        </button>
      </div>
      <table role="grid" aria-label="calendar">
        <thead>
          <tr>
            {tableHead.map((row) => {
              return (
                <th
                  key={row.name}
                  role="columnheader"
                  scope="col"
                  abbr={row.name}
                >
                  {row.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {calendarData.map((row, r) => {
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
                          onClick={() => {
                            let newDate = new Date(date);
                            newDate.setDate(cell);
                            setValue(newDate);
                          }}
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
  );
}
