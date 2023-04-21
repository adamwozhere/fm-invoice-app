import { useReducer } from 'react';

type State = {
  date: Date;
};

const initialState = {
  date: new Date(),
};

type Action =
  | { type: 'SET_DATE'; payload: { date: Date } }
  | { type: 'SET_MONTH'; payload: { month: number } }
  | { type: 'SET_DAY'; payload: { day: number } }
  | { type: 'SET_YEAR'; payload: { year: number } };

function dateReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_DATE':
      return { ...state, date: new Date(action.payload.date) };

    case 'SET_MONTH':
      return {
        ...state,
        date: new Date(state.date.setMonth(action.payload.month)),
      };

    case 'SET_DAY':
      return {
        ...state,
        date: new Date(state.date.setDate(action.payload.day)),
      };

    case 'SET_YEAR':
      return {
        ...state,
        date: new Date(state.date.setFullYear(action.payload.year)),
      };

    default:
      return state;
  }
}

// Format date for text input (19 / 04 / 2023)
const dateTo_DD_MM_YYYY_string = (date: Date) => {
  return date.toLocaleString('en-GB').split(',')[0].replaceAll('/', ' / ');
};

// Format date for calendar (Apr 2023)
const dateTo_MMM_YYYY_string = (date: Date) => {
  const arr = date.toDateString().split(' ');
  return `${arr[1]} ${arr[3]}`;
};

// Total number of days in a month of a given date
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

export function useDate(initialDate: Date) {
  const [state, dispatch] = useReducer(dateReducer, initialState);

  return {
    daysInMonth: totalDaysInMonth,
    toDateString: dateTo_DD_MM_YYYY_string,
    date: state.date,
    dispatch,
    // handleKey ? handleInput ?
    // handleClick
  };
}
