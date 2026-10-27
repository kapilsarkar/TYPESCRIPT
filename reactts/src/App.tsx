import "./App.css";
import ChaiCard from "./components/ChaiCard.tsx";
import ChaiList from "./components/ChaiList.tsx";
import Counter from "./components/Counter.tsx";
import type { Chai } from "./types.ts";

const menu: Chai[] = [
  { id: 1, name: "Masala", price: 25 },
  { id: 1, name: "Ginger", price: 50 },
  { id: 1, name: "Lemon", price: 60 },
];

function App() {
  return (
    <>
      <section id="center">
        <ChaiCard name="HeadPhones" price={50000} />
        <ChaiCard name="IPhone" price={90000} />
        <div>
          <Counter />
        </div>
        <div>
          <ChaiList items={menu} />
        </div>
      </section>
    </>
  );
}

export default App;
