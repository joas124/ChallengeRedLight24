import { Link, useNavigate } from "react-router-dom";
import { removeRestaurant } from "../../utils";

export default function Restaurant(props: any) {
  const { restaurant } = props;
  const navigate = useNavigate();


  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this Restaurant and all its Francesinhas?")) return;
    removeRestaurant(restaurant.id, navigate);
  }

  return (
    <div className="restaurant">
      <h1>{restaurant.name}</h1>
      <p>Address: {restaurant.address}</p>
      <p>City: {restaurant.city}</p>
      <p>Country: {restaurant.country}</p>
      <p>Rating: {restaurant.rating}</p>
      <h2>Francesinhas</h2>
      {restaurant.francesinhas.length === 0 && <p>No francesinhas found</p>}
      <ul>
        {restaurant.francesinhas.map((francesinha: any) => (
          <li key={francesinha.id} className="francesinha">
            <Link to={`/francesinhas/${francesinha.id}`}>{francesinha.name}</Link>
          </li>
        ))}
      </ul>
      <button><Link to={`/restaurants/${restaurant.id}/edit`}>Edit</Link></button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}