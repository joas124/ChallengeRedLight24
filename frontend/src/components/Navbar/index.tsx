import { Outlet, Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import './navbar.css';

export default function Navbar(){

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-links">
          <Link className="nav-link" to="/">🍞Home</Link>
          <Link className="nav-link" to="/francesinhas">Francesinhas</Link>
          <Link className="nav-link" to="/restaurants">Restaurants</Link>
          <Link className="nav-link" to="/ingredients">Ingredients</Link>
          <Link className="nav-link" to="/deleted">Deleted</Link>
        </div>
        <div className="nav-search">
          <SearchBar className="search-bar-nav" />
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}