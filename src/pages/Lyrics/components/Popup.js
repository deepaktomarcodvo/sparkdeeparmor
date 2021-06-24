import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";

const Popup = ({ open, children, closePopup }) => {
  const close = () => {
    closePopup(false)
  }

  return (
    <div id="myModal" className={`${open ? 'open-model' : 'close-model'} modal`}>
      <div className="modal-content">
        <span className="close">  <FontAwesomeIcon
          icon={faTimesCircle}
          className="cursor-pointer"
          onClick={() => close()}
        /> </span>
        {children}
      </div>
    </div>
  )
}

Popup.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.array,
  closePopup: PropTypes.func.isRequired
};

export default Popup;