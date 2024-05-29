import { useState, useEffect } from "react";
import { apiFrancesinhas } from "../../api/api.tsx";
import { Link } from "react-router-dom";

export default function FrancesinhasListPage(){
  const [francesinhas, setFrancesinhas] = useState([]);

  const fetchFrancesinhas = async () => {
    const response = await apiFrancesinhas.getFrancesinhas().then().catch();
    setFrancesinhas(response.data);
  }

  useEffect(() => {
    fetchFrancesinhas();
  }, []);

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