import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchFrancesinhas } from "../../utils";
import Button from "../../components/Button";

export default function FrancesinhasListPage(){
  const [francesinhas, setFrancesinhas] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/francesinhas/add');
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    const sort = searchParams.get('sort');
    fetchFrancesinhas(query, sort, setFrancesinhas);
  }, [location.search, location.pathname]);

  return (
    <div className="francesinha-list">
      <h1>Francesinhas</h1>
      { francesinhas.length === 0 ? (<p>No francesinhas found</p>) : (
        <ul>
          {francesinhas.map((francesinha: any) => (
            <li key={francesinha.id} className="francesinha">
              <Link to={`/francesinhas/${francesinha.id}`}>{francesinha.name}</Link>
            </li>
          ))}
        </ul>
      )}
      <Button text="Add New Francesinha" handleClick={handleClick}/>
    </div>
  );
}