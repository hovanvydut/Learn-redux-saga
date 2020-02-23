import * as modalTypes from '../constants/modal';

export const showModal = () => {
  return {
    type: modalTypes.SHOW_MODAL
  };
};

export const hideModal = () => {
  return {
    type: modalTypes.HIDE_MODAL
  };
};

export const changeModalTitle = title => {
  return {
    type: modalTypes.CHANGE_MODAL_TITLE,
    payload: { title }
  };
};
export const changeModalContent = component => {
  return {
    type: modalTypes.CHANGE_MODAL_CONTENT,
    payload: { component }
  };
};
