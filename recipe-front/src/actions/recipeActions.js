const apiURL = 'http://localhost:3022'

export function fetchRecipes() {
  return dispatch => {
    dispatch(fetchRecipesBegin());
    return fetch(`${apiURL}/recipes`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchRecipesSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchRecipesFailure(error)));
  };
}


export function updateRecipe({_id, name, ingredients}) {
  return dispatch => {
    dispatch(updateRecipeBegin());
    return fetch(`${apiURL}/recipes/${_id}`, {
      method: "PUT", 
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({name, ingredients}), // body data type must match "Content-Type" header
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(updatedRecipe => {
        dispatch(updateRecipeSuccess(updatedRecipe));
        return updatedRecipe;
      })
      .catch(error => dispatch(updateRecipeFailure(error)));
  };
}

export function deleteRecipe(id) {
  return dispatch => {
    dispatch(deleteRecipeBegin(id));
    return fetch(`${apiURL}/recipes/${id}`, {
      method: "DELETE", 
    })
      .then(handleErrors)
      .then(() => {
        dispatch(deleteRecipeSuccess(id));
        return id;
      })
      .catch(error => dispatch(deleteRecipeFailure(error)));
  };
}

export function createRecipe({name, ingredients}) {
  return dispatch => {
    dispatch(createRecipeBegin());
    return fetch(`${apiURL}/recipes`, {
      method: "POST", 
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({name, ingredients}), // body data type must match "Content-Type" header
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(newRecipe => {
        dispatch(createRecipeSuccess(newRecipe));
        return newRecipe;
      })
      .catch(error => dispatch(createRecipeFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FETCH_RECIPES_BEGIN = 'FETCH_RECIPES_BEGIN';
export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_FAILURE = 'FETCH_RECIPES_FAILURE';

export const UPDATE_RECIPE_BEGIN = 'UPDATE_RECIPE_BEGIN';
export const UPDATE_RECIPE_SUCCESS = 'UPDATE_RECIPE_SUCCESS';
export const UPDATE_RECIPE_FAILURE = 'UPDATE_RECIPE_FAILURE';

export const CREATE_RECIPE_BEGIN = 'CREATE_RECIPE_BEGIN';
export const CREATE_RECIPE_SUCCESS = 'CREATE_RECIPE_SUCCESS';
export const CREATE_RECIPE_FAILURE = 'CREATE_RECIPE_FAILURE';

export const DELETE_RECIPE_BEGIN = 'DELETE_RECIPE_BEGIN';
export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS';
export const DELETE_RECIPE_FAILURE = 'DELETE_RECIPE_FAILURE';

/* UPDATE */
export const updateRecipeBegin = () => ({
  type: UPDATE_RECIPE_BEGIN
})

export const updateRecipeSuccess = updated => ({
  type: UPDATE_RECIPE_SUCCESS,
  payload: updated
})

export const updateRecipeFailure = () => ({
  type: UPDATE_RECIPE_FAILURE
})

/* CREATE */
export const createRecipeBegin = () => ({
  type: CREATE_RECIPE_BEGIN
})

export const createRecipeSuccess = created => ({
  type: CREATE_RECIPE_SUCCESS,
  payload: created 
})

export const createRecipeFailure = () => ({
  type: CREATE_RECIPE_FAILURE
})

/* DELETE */

export const deleteRecipeBegin = id => ({
  type: DELETE_RECIPE_BEGIN,
  payload: {
    deletingId: id
  }
})

export const deleteRecipeSuccess = id => ({
  type: DELETE_RECIPE_SUCCESS,
  payload: {
    toDeleteId: id
  } 
})

export const deleteRecipeFailure = () => ({
  type: DELETE_RECIPE_FAILURE
})

/* FETCH */
export const fetchRecipesBegin = () => ({
  type: FETCH_RECIPES_BEGIN
});

export const fetchRecipesSuccess = recipes => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: {
    recipes 
  }
});

export const fetchRecipesFailure = error => ({
  type: FETCH_RECIPES_FAILURE,
  payload: {
    error
  }
});