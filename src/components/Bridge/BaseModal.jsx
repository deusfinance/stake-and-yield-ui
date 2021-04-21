import React from 'react'
import PropTypes from 'prop-types'

const BaseModal = ({
  size,
  open,
  title,
  children,
  onRequestClose,
  buttons
}) => {
  const sizeClass = () => {
    const sizeMap = {
      sm: 'modal-sm',
      lg: 'modal-lg',
      xl: 'modal-xl'
    }
    return sizeMap[size] || ''
  }

  const onClose = (e) => {
    onRequestClose && onRequestClose(e)
  }

  return (
    <div
      onClick={onClose}
      className={`modal ${open ? ' show' : ''}`}
      id="exampleModalSizeSm"
      tabIndex="-1"
      aria-labelledby="exampleModalSizeSm"
      aria-modal="true"
      role="dialog"
    >
      {/* modal-sm  "" modal-lg modal-xl */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={'modal-dialog modal-dialog-centered ' + sizeClass()}
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>

            <span className="close" onClick={onClose}>
              &times;
            </span>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">{buttons}</div>
        </div>
      </div>
    </div>
  )
}

BaseModal.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'default', 'lg', 'xl'])
}

BaseModal.defaultProps = {
  open: false,
  title: 'Modal',
  size: 'default'
}

export default BaseModal
