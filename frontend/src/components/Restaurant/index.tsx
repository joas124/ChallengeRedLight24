import { Link, useNavigate } from "react-router-dom";
import { removeRestaurant } from "../../utils";
import Button from "../Button";

export default function Restaurant(props: any) {
  const { restaurant } = props;
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
      <Button text="Edit" handleClick={handleEdit}/>
      <Button text="Delete" handleClick={handleDelete}/>
    </div>
  );
}