import "./deleted-page.css";
import { useState, useEffect } from "react";
import { apiFrancesinhas, apiIngredients, apiRestaurants } from "../../api/api";
import type { Francesinha, Ingredient, Restaurant } from "../../utils";

export default function DeletedPage() {
  const [deletedFrancesinhas, setDeletedFrancesinhas] = useState<Francesinha[]>([]);
  const [deletedRestaurants, setDeletedRestaurants] = useState<Restaurant[]>([]);
  const [deletedIngredients, setDeletedIngredients] = useState<Ingredient[]>([]);

  const fetchDeleted = async () => {
    try {
      const [francesinhas, restaurants, ingredients] = await Promise.all([
        apiFrancesinhas.getDeletedFrancesinhas(),
        apiRestaurants.getDeletedRestaurants(),
        apiIngredients.getDeletedIngredients()
      ]);
      setDeletedFrancesinhas(francesinhas.data);
      setDeletedRestaurants(restaurants.data);
      setDeletedIngredients(ingredients.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleRestore = async (id: number, type: 'francesinha' | 'restaurant' | 'ingredient') => {
    if (window.confirm(`Are you sure you want to restore this ${type}?`)) {
      try {
        switch (type) {
          case 'francesinha':
            // await apiFrancesinhas.restoreFrancesinha(id);
            break;
          case 'restaurant':
            // await apiRestaurants.restoreRestaurant(id);
            break;
          case 'ingredient':
            // await apiIngredients.restoreIngredient(id);
            break;
          default:
            throw new Error('Invalid type');
        }
        fetchDeleted();
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleDelete = async (id: number, type: 'francesinha' | 'restaurant' | 'ingredient') => {
    if (window.confirm(`Are you sure you want to permanently delete this ${type}?`)) {
      try {
        switch (type) {
          case 'francesinha':
            await apiFrancesinhas.deleteFrancesinha(id, true);
            break;
          case 'restaurant':
            await apiRestaurants.deleteRestaurant(id, true);
            break;
          case 'ingredient':
            await apiIngredients.deleteIngredient(id, true);
            break;
          default:
            throw new Error('Invalid type');
        }
        fetchDeleted();
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    fetchDeleted();
  }, []);

  return (
    <div>
      <h1>Deleted Elements</h1>
      <p>Here you can find all the elements that you deleted. If you want to restore them (or permanently delete them), click on the buttons below.</p>

      <div className="deleted-francesinhas">
        <h2>Deleted Francesinhas</h2>
        {deletedFrancesinhas.length === 0 ? (<p>No deleted francesinhas found</p>) : (
          <ul className="small-list">
            {deletedFrancesinhas.map((francesinha) => (
              <li key={francesinha.id}>
                {francesinha.name}
                <button onClick={() => handleRestore(francesinha.id, 'francesinha')}>Restore</button>
                <button onClick={() => handleDelete(francesinha.id, 'francesinha')}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="deleted-restaurants">
        <h2>Deleted Restaurants</h2>
        {deletedRestaurants.length === 0 ? (<p>No deleted restaurants found</p>) : (
          <ul className="small-list">
            {deletedRestaurants.map((restaurant) => (
              <li key={restaurant.id}>
                {restaurant.name}
                <button onClick={() => handleRestore(restaurant.id, 'restaurant')}>Restore</button>
                <button onClick={() => handleDelete(restaurant.id, 'restaurant')}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="deleted-ingredients">
        <h2>Deleted Ingredients</h2>
        {deletedIngredients.length === 0 ? (<p>No deleted ingredients found</p>) : (
          <ul className="small-list">
            {deletedIngredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.name}
                <button onClick={() => handleRestore(ingredient.id, 'ingredient')}>Restore</button>
                <button onClick={() => handleDelete(ingredient.id, 'ingredient')}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
