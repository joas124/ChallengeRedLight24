import { Link } from "react-router-dom";

export default function Francesinha(props: any) {
  const { francesinha } = props;

  return(
    <div className="francesinha">
      <h1>{francesinha.name}</h1>
      {francesinha.image ? <img src={francesinha.image} alt={francesinha.name}/> : "No image available"}
      <p>Price: {francesinha.price}</p>
      <p>Rating: {francesinha.rating}</p>
      <h2>Ingredients</h2>
      <ul>
        {francesinha.ingredients.map((ingredient: any) => (
          <li key={ingredient.id} className="ingredient">
            {ingredient.name}
          </li>
        ))}
      </ul>
      <h2>Restaurant</h2>
      <Link to={`/restaurants/${francesinha.restaurant.id}`}>{francesinha.restaurant.name}</Link>
    </div>
  );

}