import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchFrancesinhas } from "../../utils";

export default function FrancesinhasListPage(){
  const [francesinhas, setFrancesinhas] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    fetchFrancesinhas(query, setFrancesinhas);
  }, [location.search]);

  return (
    <div className="francesinha-list">
      <ul>
        {francesinhas.map((francesinha: any) => (
          <li key={francesinha.id} className="francesinha">
            <Link to={`${francesinha.id}`}>{francesinha.name}</Link>
          </li>
        ))}
      </ul>
      <button><Link to="/francesinhas/add">Add New Francesinha</Link></button>
    </div>
  );
}