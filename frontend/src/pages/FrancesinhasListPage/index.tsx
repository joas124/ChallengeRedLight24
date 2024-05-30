import "./francesinhas-list.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchFrancesinhas } from "../../utils";
import Button from "../../components/Button";

export default function FrancesinhasListPage(){
  const [francesinhas, setFrancesinhas] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/francesinhas/add');
  }

  const handleClick = (id: number) => {
    navigate(`/francesinhas/${id}`);
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    const sort = searchParams.get('sort');
    fetchFrancesinhas(query, sort, setFrancesinhas);
  }, [location.search, location.pathname]);

  return (
    <div className="list-page">
      <div className="list-header">
        <h1>Francesinhas</h1>
        <Button text="Add New Francesinha" handleClick={handleAdd}/>
      </div>
      { francesinhas.length === 0 ? (<p>No francesinhas found</p>) : (
        <ul className="list">
          {francesinhas.map((francesinha: any) => (
            <li key={francesinha.id} className="list-element" onClick={() => handleClick(francesinha.id)}>
              <h2>{francesinha.name}</h2>
              {francesinha.image && <img src={francesinha.image} className="francesinha-img" alt={francesinha.name} />}
              <p>{francesinha.rating}⭐ | {francesinha.price}€</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}