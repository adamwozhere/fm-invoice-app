export function numberCountItem(
  count: number,
  singular: string,
  plural: string
) {
  let verb = 'are';
  let item = plural;
  if (count === 1) {
    verb = 'is';
    item = singular;
  }
  return `There ${verb} ${count} ${item}.`;
}
