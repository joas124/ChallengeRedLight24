import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {

  const [type, setType] = useState('francesinhas' as string);
  const [sort, setSort] = useState('name' as string);
  const navigate = useNavigate();
  const search = useRef<HTMLInputElement>(null);

  const handleSearch = (event: any) => {
    if(event.key === "Enter" || event.type === "click"){
        navigate(`/${type}/search?q=${search.current?.value}&sort=${sort}`);
    }
  }




  return (
    <div className="search-bar">
      <input type="search" className="search-input" placeholder="Search" ref={search} onKeyDown={handleSearch} />
      <select name="type" onChange={(event) => setType(event.target.value)}>
        <option value="francesinhas">Francesinha</option>
        <option value="restaurants">Restaurant</option>
        <option value="ingredients">Ingredient</option>
      </select>
      <label>Sort By:</label>
      <select name="sort" onChange={(event) => setSort(event.target.value)}>
        <option value="name">Name</option>
        {type !== 'ingredients' && <option value="rating">Rating</option>}
        {type === 'francesinhas' && <option value="price">Price</option>}
      </select>
      <input type="submit" value="Search" onClick={handleSearch} />
    </div>
  );
}