const intl = new Intl.NumberFormat('en-UK', {
  style: 'currency',
  currency: 'GBP',
});

export const formatCurrency = (amount: number): string => {
  return (
    intl
      .format(amount)
      // insert space after first non-digit character
      .replace(/^(\D+)/, '$1 ')
      // (bug in some browsers may create double space - replace double with single space)
      .replace(/\s+/, ' ')
  );
};
