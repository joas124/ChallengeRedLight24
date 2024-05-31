import "./francesinha.css";
import { Link, useNavigate } from "react-router-dom";
import { apiFrancesinhas } from "../../api/api";
import Button from "../Button";
import StarRating from "../StarRating";
import type { FrancesinhaType } from "../../utils";



export default function Francesinha( {francesinha} : {francesinha: FrancesinhaType} ) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this francesinha?")) return;
    try {
      await apiFrancesinhas.deleteFrancesinha(francesinha.id);
      navigate('/francesinhas');
    } catch (error) {
      console.error(error);
    }
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
        <Button text="Edit" handleClick={() => navigate(`/francesinhas/${francesinha.id}/edit`)} />
        <Button text="Delete" handleClick={handleDelete} />
      </div>
    </div>
  );
}