export const SHOW_MODAL         = "SHOW_MODAL";
export const CLOSE_MODAL        = "CLOSE_MODAL";
export const SHOW_MODAL_CONFIRM = "SHOW_MODAL_CONFIRM";
export const CLOSE_MODAL_CONFIRM= "CLOSE_MODAL_CONFIRM";

export const showModal = modal => ({
  type: SHOW_MODAL,
  payload: { modal }
});

export const closeModal = modal => ({
  type: CLOSE_MODAL
});

export const showModalConfirm = actions => ({
  type: SHOW_MODAL_CONFIRM,
  payload: {actions}
});

export const closeModalConfirm = data => ({
  type: CLOSE_MODAL_CONFIRM,
  payload: {data}
});
