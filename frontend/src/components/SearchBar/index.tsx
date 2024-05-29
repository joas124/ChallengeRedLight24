import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {

  const [type, setType] = useState('francesinha' as string);
  const navigate = useNavigate();

  const handleSearch = (event: any) => {
    if(event.key === "Enter" || event.type === "click"){
      const search = document.querySelector('.search-input') as HTMLInputElement;
      if(type === 'francesinha'){
        //route to francesinha search page
        navigate(`/francesinhas/search?q=${search.value}`);
      }else if(type === 'restaurant'){
        //route to restaurant search page
        navigate(`/restaurants/search?q=${search.value}`);
      }
      console.log(search.value);
    }
  }


  return (
    <div className="search-bar">
      <input type="search" className="search-input" placeholder="Search" onKeyDown={handleSearch} />
      <select name="type" onChange={(event) => setType(event.target.value)}>
        <option value="francesinha">Francesinha</option>
        <option value="restaurant">Restaurant</option>
      </select>
      <input type="submit" value="Search" onClick={handleSearch} />
    </div>
  );
}