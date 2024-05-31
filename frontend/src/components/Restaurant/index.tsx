import "./restaurant.css";
import { Link, useNavigate } from "react-router-dom";
import { apiRestaurants } from "../../api/api";
import Button from "../Button";
import StarRating from "../StarRating";
import type { RestaurantType, FrancesinhaType } from "../../utils";


export default function Restaurant({restaurant, francesinhas}: {restaurant: RestaurantType, francesinhas: FrancesinhaType[]}) {
  const navigate = useNavigate();


  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this Restaurant and all its Francesinhas?")) return;
    try {
      await apiRestaurants.deleteRestaurant(restaurant.id);
      navigate('/restaurants');
    } catch (error) {
      console.error(error);
    }
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
          {francesinhas.length === 0 && <p>No francesinhas found</p>}
          <ul className="restaurant-francesinhas-list">
            {francesinhas.map((francesinha: any) => (
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