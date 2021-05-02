import React from 'react'

const ActionButton = (props) => {
  const { type, title, onlyLocking, onClick } = props
  return (
    <a
      className={`action-btn pointer ${
        type === 'GET' ? (onlyLocking ? 'uni-get-btn' : 'get-btn') : 'lock-btn'
      }`}
      onClick={(e) => onClick(e)}
    >
      <span className={`${onlyLocking ? 'uni-background' : ''}`}>
        {`${type} ${title}`}
      </span>
    </a>
  )
}

export default ActionButton
