import { useState } from "react";

interface OrderFormProps {
    onSubmit(order: { name: string; cups: number }): void;
}

const OrderForm = ({ onSubmit }: OrderFormProps) => {
    const [name, setName] = useState<string>("Masala");
    const [cups, setCups] = useState<number>(1);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ name, cups });
    };
    return (
        <div>
            <h2>Order Form</h2>
            <form onSubmit={handleSubmit}>
                <label>Chai Name</label>
                <input
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)}
                />
                <label>Cups</label>
                <input
                    value={cups}
                    type="number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCups(Number(e.target.value) || 0)}
                />
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default OrderForm;
