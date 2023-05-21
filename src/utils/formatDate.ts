const intl = new Intl.DateTimeFormat('en-UK', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export const formatDate = (date: Date): string => intl.format(date);
