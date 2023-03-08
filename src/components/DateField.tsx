export default function DateField() {
  const today = new Date();

  return (
    <div>
      <label htmlFor=""></label>
      <input type="date" min={today.toISOString} />
    </div>
  );
}
