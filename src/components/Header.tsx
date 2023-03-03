interface Props {
  num: number;
}

export default function Header({ num }: Props) {
  return (
    <header>
      <div>
        <div>
          <h1>Invoices</h1>
          <p>There are {num}invoices</p>
        </div>
        <div>
          <label htmlFor="">Filter by status</label>
        </div>
      </div>
      <div>
        <button>New Invoice</button>
      </div>
    </header>
  );
}
