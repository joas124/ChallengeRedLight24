import './landing-page.css';
import SearchBar from '../../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

export default function LandingPage() {

  const navigate = useNavigate();

  const handleFrancesinhasClick = () => {
    navigate('/francesinhas');
  }
  const handleRestaurantsClick = () => {
    navigate('/restaurants');
  }

  return (
    <div className='landing-page'>
      <h1>Welcome to the Francesinha Wiki!</h1>
      <SearchBar className="search-bar-landing" />
      <div className='landing-page-buttons'>
        <Button text='All Francesinhas' handleClick={handleFrancesinhasClick} />
        <Button text='All Restaurants' handleClick={handleRestaurantsClick} />
      </div>
    </div>
  );
}