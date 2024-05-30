import "./restaurant.css";
import { Link, useNavigate } from "react-router-dom";
import { removeRestaurant } from "../../utils";
import Button from "../Button";
import StarRating from "../StarRating";

type Restaurant = {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  francesinhas: any[];
  rating: number;
}

export default function Restaurant({restaurant}: {restaurant: Restaurant}) {
  const navigate = useNavigate();


  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this Restaurant and all its Francesinhas?")) return;
    removeRestaurant(restaurant.id, navigate);
  }

  const handleEdit = () => {
    navigate(`/restaurants/${restaurant.id}/edit`);
  }

  return (
    <div className="restaurant">
      <h1>{restaurant.name}</h1>
      <div className="restaurant-content">
        <div className="restaurant-info">
          <h2>Address</h2>
          <p>{restaurant.address}</p>
          <p>{restaurant.city} - {restaurant.country}</p>
          <h2>Rating:</h2>
          <StarRating rating={restaurant.rating.toString()} />
        </div>
        <div className="restaurant-francesinhas">
          <h2>Francesinhas</h2>
          {restaurant.francesinhas.length === 0 && <p>No francesinhas found</p>}
          <ul className="restaurant-francesinhas-list">
            {restaurant.francesinhas.map((francesinha: any) => (
              <li key={francesinha.id} className="francesinha-item">
                <Link to={`/francesinhas/${francesinha.id}`}>{francesinha.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="restaurant-buttons">
        <Button text="Edit" handleClick={handleEdit}/>
        <Button text="Delete" handleClick={handleDelete}/>
      </div>
    </div>
  );
}