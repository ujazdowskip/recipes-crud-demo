import {
  EDITOR_OPEN,
  EDITOR_CLOSE,
} from '../actions/editorActions';

const initialState = {
  isOpen: false,
  data: null,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case EDITOR_OPEN:
      return {
        ...state,
        isOpen: true,
        data: action.payload.data
      };

    case EDITOR_CLOSE:
      return {
        ...state,
        isOpen: false,
        data: null
      };

    default:
      return state;
  }
}