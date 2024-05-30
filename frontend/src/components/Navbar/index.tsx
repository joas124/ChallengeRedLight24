import { Outlet, Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import './navbar.css';

export default function Navbar(){

  return (
    <>
      <nav className="nav-bar">
        <Link to="/">Home</Link>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/francesinhas">Francesinhas</Link>
        <Link to="/ingredients">Ingredients</Link>
        <SearchBar />
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}