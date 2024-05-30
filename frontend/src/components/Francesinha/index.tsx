import { Link, useNavigate } from "react-router-dom";
import { removeFrancesinha } from "../../utils";
import Button from "../Button";

type Francesinha = {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: any;
  ingredients: any[];
  restaurant: any;
}

interface FrancesinhaProps {
  francesinha: Francesinha;
}

export default function Francesinha( {francesinha} : FrancesinhaProps ) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this francesinha?")) return;
    removeFrancesinha(francesinha.id, navigate);
  }

  const handleEdit = () => {
    navigate(`/francesinhas/${francesinha.id}/edit`);
  }

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
      <Button text="Edit" handleClick={handleEdit}/>
      <Button text="Delete" handleClick={handleDelete}/>
    </div>
  );

}