import { useEffect, useState } from "react";
import { fetchIngredients } from "../../utils";
import { apiIngredients } from "../../api/api";
import { AxiosError } from "axios";
import Button from "../../components/Button";
import { useLocation } from "react-router-dom";


export default function IngredientPage() {
  type Ingredient = {
    id: number;
    name: string;
  }

  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);
  const location = useLocation();

  const handleAdd = async () => {
    //Pop-up to add new ingredient
    const name = prompt("Please enter the ingredient name:");
    if (name){
      try {
        await apiIngredients.createIngredient({name: name});
        fetchIngredients(null, null, setIngredients);
      } catch (error) {
        if((error instanceof AxiosError) && error.response){
          if (error.response.status === 400){
            window.alert(error.response.data.detail);
          }else{
            window.alert("Error creating ingredient");
          }
        }
      }
    }
  }

  const handleEdit = async (id: number, name: string) => {
    const newName = prompt("Please enter the new name for the ingredient:", name);
    if (newName){
      try {
        await apiIngredients.updateIngredient(id, {name: newName});
        fetchIngredients(null, null, setIngredients);
      } catch (error) {
        if((error instanceof AxiosError) && error.response){
          if (error.response.status === 400){
            window.alert(error.response.data.detail);
          }else{
            window.alert("Error updating ingredient");
          }
        }
      }
    }
  }

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete '${name}'? (It will be removed from all francesinhas)`)){
      try {
        await apiIngredients.deleteIngredient(id);
        fetchIngredients(null, null, setIngredients);
      } catch (error) {
        if((error instanceof AxiosError) && error.response){
          if (error.response.status === 400){
            window.alert(error.response.data.detail);
          }else{
            window.alert("Error deleting ingredient");
          }
        }
      }
    }
  }


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    const sort = searchParams.get('sort');
    fetchIngredients(query, sort, setIngredients);
  }, [location.search, location.pathname]);


  //List all ingredients, and besides the name, show a button to delete and to edit the ingredient
  return (
    <>
      <h1>Ingredients</h1>
      {!ingredients ? (<p>No Ingredients Found!</p>) : (
        <ul>
          {ingredients.map((ingredient: any) => (
            <li key={ingredient.id} className="ingredient">
              {ingredient.name}
              <Button text="Edit" handleClick={() => handleEdit(ingredient.id, ingredient.name)}/>
              <Button text="Delete" handleClick={() => handleDelete(ingredient.id, ingredient.name)}/>
            </li>
          ))}
        </ul>
      )}
      <Button text="Add New Ingredient" handleClick={handleAdd}/>
    </>
  );
}