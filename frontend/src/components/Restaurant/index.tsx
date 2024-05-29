import { Link } from "react-router-dom";

export default function Restaurant(props: any) {
  const { restaurant } = props;

  return (
    <div className="restaurant">
      <h1>{restaurant.name}</h1>
      <p>Address: {restaurant.address}</p>
      <p>City: {restaurant.city}</p>
      <p>Country: {restaurant.country}</p>
      <p>Rating: {restaurant.rating}</p>
      <h2>Francesinhas</h2>
      <ul>
        {restaurant.francesinhas.map((francesinha: any) => (
          <li key={francesinha.id} className="francesinha">
            <Link to={`/francesinhas/${francesinha.id}`}>{francesinha.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}