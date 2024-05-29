
export default function FrancesinhaForm(props: any) {

  type Ingredient = {
    id: number;
    name: string;
  }

  const { id,  francesinha, ingredients, restaurants, handleSubmit, fieldErrors, navigate } = props;

  return (
    <div className="form-class">
      {id ?  (
        <h1>Editing {francesinha.name}</h1>
      ): (
        <h1>Add Francesinha</h1>
      )}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        {fieldErrors.name && <span className="error">{fieldErrors.name}</span>}
        <input type='text' name='name' defaultValue={francesinha.name} />

        <label>Price:</label>
        {fieldErrors.price && <span className="error">{fieldErrors.price}</span>}
        <input type='text' name='price' defaultValue={francesinha.price} />
        
        <label>Rating:</label>
        {fieldErrors.rating && <span className="error">{fieldErrors.rating}</span>}
        <input type='text' name='rating' defaultValue={francesinha.rating} />

        <label>Image:</label>
        {fieldErrors.image && <span className="error">{fieldErrors.image}</span>}
        <input type='file' name='image' />
        
        <label>Ingredients:</label>
        {fieldErrors.ingredients && <span className="error">{fieldErrors.ingredients}</span>}
        <ul>
          {ingredients.map((ingredient: Ingredient) => (
            <li key={ingredient.id}>
              <input type='checkbox' name='ingredients' value={ingredient.id} defaultChecked={francesinha.ingredients.some((i: Ingredient) => i.id === ingredient.id)} />
              {ingredient.name}
            </li>
          ))}
        </ul>
        
        <label>Restaurant:</label>
        {fieldErrors.restaurant && <span className="error">{fieldErrors.restaurant}</span>}
        <select name='restaurant' defaultValue={francesinha.restaurant.id}>
          {restaurants.map((restaurant:any) => (
            <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
          ))}
        </select>
        
        <button type='submit'>Save</button>
        <button type='button' onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
}