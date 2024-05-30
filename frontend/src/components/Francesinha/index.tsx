import "./francesinha.css";
import { Link, useNavigate } from "react-router-dom";
import { removeFrancesinha } from "../../utils";
import Button from "../Button";
import StarRating from "../StarRating";

type Francesinha = {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: any;
  ingredients: any[];
  restaurant: any;
}

export default function Francesinha( {francesinha} : {francesinha: Francesinha} ) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this francesinha?")) return;
    removeFrancesinha(francesinha.id, navigate);
  }

  const handleEdit = () => {
    navigate(`/francesinhas/${francesinha.id}/edit`);
  }

  return (
    <div className="francesinha">
      <div className="francesinha-header">
        <h1>{francesinha.name}</h1>
      </div>
      <div className="francesinha-content">
        {francesinha.image && <img src={francesinha.image} alt={francesinha.name} className="francesinha-image" />}
        <div className="francesinha-info">
          <div>
            <h2>Price</h2>
            <p>{francesinha.price}€</p>
          </div>
          <div>
            <h2>Rating</h2>
            <div className="francesinha-rating">
              <StarRating rating={francesinha.rating.toString()} />
            </div>
          </div>
          <div>
            <h2>Ingredients</h2>
            <ul className="ingredient-list">
              {francesinha.ingredients.map((ingredient: any) => (
                <li key={ingredient.id} className="ingredient">
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Restaurant</h2>
            <Link to={`/restaurants/${francesinha.restaurant.id}`}>{francesinha.restaurant.name}</Link>
          </div>
        </div>
      </div>
      <div className="francesinha-buttons">
        <Button text="Edit" handleClick={handleEdit} />
        <Button text="Delete" handleClick={handleDelete} />
      </div>
    </div>
  );
}