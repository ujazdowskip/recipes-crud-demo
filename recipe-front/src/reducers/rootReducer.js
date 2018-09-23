import {
  combineReducers
} from 'redux';
import recipes from './recipeReducer';
import editor from './editorReducer';

export default combineReducers({
  recipes,
  editor
});