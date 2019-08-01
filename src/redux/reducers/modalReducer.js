import {
  SHOW_MODAL,
  CLOSE_MODAL,
  SHOW_MODAL_CONFIRM,
  CLOSE_MODAL_CONFIRM
} from '../actions/modalActions';

const initialState = {
  type: 'error',
  confirmDelete: false,
  toggleShow: false,
  confirmAction: null
}

export default function ModalReducer (
  state = initialState,
  action
) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        toggleShow: true,
        ...action.payload.modal
      };
    case CLOSE_MODAL:
      return {
        ...state,
        toggleShow: false
      };
    case SHOW_MODAL_CONFIRM:
      return {
        ...state,
        toggleShow: true,
        type: 'warning',
        confirmDelete: true,
        confirmAction: action.payload.actions.action
      };
    case CLOSE_MODAL_CONFIRM:
      return {
        ...state,
        toggleShow: false,
        confirmDelete: false
      };
    default:
      return state;
  }
}
