import LogOutButton from '../LogOutButton/LogOutButton';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeTypeButtons from '../RecipeTypeButtons/RecipeTypeButtons';
import { propTypes } from 'react-bootstrap/esm/Image';
import RecipeCard from '../RecipeCard/RecipeCard';


function UserPage() {

  const dispatch = useDispatch();

  const recipeReducer = useSelector((store) => store.recipeReducer);
  const recipeTypes = useSelector((store) => store.recipeReducer.recipeTypesReducer);
  const recipeCardInfo = useSelector((store) => store.recipeReducer.recipeCardReducer);


  useEffect(() => {
    //on pageLoad, FETCH_RECIPE_CARD_INFO gets all the recipe cards 
    dispatch({ type: "FETCH_RECIPE_CARD_INFO" });
    //on pageLoad, FETCH_RECIPE_TYPES gets all the recipe types 
    dispatch({ type:"FETCH_RECIPE_TYPES"});
  }, []);

  //allButton shows all recipes on the click of the all button 
  const allButton = () => {
    dispatch({ type: "FETCH_RECIPE_CARD_INFO" });
  }

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h1>Hello {user.username}!</h1>
      <p>What do you want to cook today?</p>
      {/* <p>Your ID is: {user.id}</p> */}
      {/* {JSON.stringify(recipeReducer)} */}
      <div>
        <h2>Filter by meal</h2>

        {/* map though recipeTypes. For every individual recipeType, return a button with the name of the recipe type */}
        <button onClick={allButton}>All</button>
        {recipeTypes.map((recipeType) => {
                return (
                  //render the RecipeTypeButtons component and pass down the name of the recipe type to it as "name" and the id as "id"
                  <RecipeTypeButtons key={recipeType.id} name={recipeType.recipe_type} id={recipeType.id}/>
                );
              })}
      </div>
      <div>
        <h2>Recipes</h2>
        {/* {JSON.stringify(recipeCardInfo)} */}
        {recipeCardInfo.map((recipeCard) => {
          return(
          <RecipeCard key={recipeCard.id} recipe={recipeCard} />
          );
        })}

      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
