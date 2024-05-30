import './landing-page.css';
import SearchBar from '../../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

export default function LandingPage() {

  const navigate = useNavigate();

  return (
    <div className='landing-page'>
      <h1>Welcome to the Francesinha Wiki!</h1>
      <p className='landing-info'>Discover the best Francesinhas and restaurants from all over the World!</p> 
      <p>Explore, add or edit Francesinhas, Restaurants, Ingredients in seconds!</p>
      <SearchBar className="search-bar-landing" />
      <div className='landing-page-buttons'>
        <Button text='All Francesinhas' handleClick={() => navigate('/francesinhas')} />
        <Button text='All Restaurants' handleClick={() => navigate('/restaurants')} />
        <Button text='All Ingredients' handleClick={() => navigate('/ingredients')} />
      </div>
    </div>
  );
}