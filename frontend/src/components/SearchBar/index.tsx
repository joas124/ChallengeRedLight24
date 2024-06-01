import './searchbar.css';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({className}: {className: 'search-bar-nav' | 'search-bar-landing'}) {

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
    <div className={className}>
      <div className='search-form'>
        <input type="search" className="search-input" placeholder="Search" ref={search} onKeyDown={handleSearch} />
        <input type="submit" className="search-button" value='' onClick={handleSearch}/>
      </div>
      <div className="search-bar-selects">
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
      </div>
    </div>
  );
}