import "./App.css";
import Card from "./components/Card.tsx";
import ChaiCard from "./components/ChaiCard.tsx";
import ChaiList from "./components/ChaiList.tsx";
import Counter from "./components/Counter.tsx";
import CustomHook from "./components/CutomHook.tsx";
import OrderForm from "./components/OrderForm.tsx";
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
        <div>
           <OrderForm onSubmit={(order)=>{
            console.log("Placed :",order.name,order.cups)
           }}/>
        </div>
        <div>
          <Card title="Chai Or TypeScript" footer={<button>Order Now</button>}/>
        </div>
        <div>
          <CustomHook/>
        </div>
      </section>
    </>
  );
}

export default App;
