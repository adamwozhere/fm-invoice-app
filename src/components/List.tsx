export default function List<T extends React.ReactNode>(items: T[]) {
  return (
    <ul>
      {items.map((item, i: number) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
