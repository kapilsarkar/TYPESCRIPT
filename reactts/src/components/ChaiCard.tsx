interface ChaiCardProp {
    name: string;
    price: number;
    isSpecial?: boolean;
}

const ChaiCard = ({ name, price, isSpecial = false }: ChaiCardProp) => {
    return (
        <article>
            <h2>Component Display passing Pro Using TypeScript in React-JS</h2>
            <h2>{name} {isSpecial && <span>⭐</span>}</h2>
            <p>{price}</p>
        </article>
    );
};

export default ChaiCard;
