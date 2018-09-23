import {
  FETCH_RECIPES_BEGIN,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
  UPDATE_RECIPE_BEGIN,
  UPDATE_RECIPE_SUCCESS,
  UPDATE_RECIPE_FAILURE,
  CREATE_RECIPE_BEGIN,
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAILURE,
  DELETE_RECIPE_BEGIN,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAILURE,
} from '../actions/recipeActions';

const initialState = {
  items: [],
  loading: false,
  deletingId: false,
  error: null
};

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RECIPES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_RECIPES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.recipes
      };

    case FETCH_RECIPES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };
      
    /* UPDATE */

    case UPDATE_RECIPE_BEGIN:
      return {
        ...state,
        loading: true
      }
    
    case UPDATE_RECIPE_SUCCESS:
      const {payload} = action
      const newItems = state.items.map(item => {
        if (item._id === payload._id) {
          return payload
        }

        return item
      })
      return {
        ...state,
        items: newItems,
        loading: false,
      };

    case UPDATE_RECIPE_FAILURE:
      return  {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    
    /* CREATE */
    
    case CREATE_RECIPE_BEGIN:
      return {
        ...state,
        loading: true
      }
    
    case CREATE_RECIPE_SUCCESS:
      return {
        ...state,
        items: [
          action.payload,
          ...state.items,
        ],
        loading: false,
      };
    
    case CREATE_RECIPE_FAILURE:
      return  {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    
      /* DELETE */
    
    case DELETE_RECIPE_BEGIN:
      return {
        ...state,
        deletingId: action.payload.deletingId
      }
    
    case DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items.filter(recipe => recipe._id !== action.payload.toDeleteId),
        ],
        deletingId: null,
      };

    case DELETE_RECIPE_FAILURE:
      return  {
        ...state,
        deletingId: null,
        error: action.payload.error,
      }


    default:
      return state;
  }
}