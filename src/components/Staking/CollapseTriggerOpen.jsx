import React from 'react'

const CollapseTriggerOpen = ({ title, apy, balanceWallet, handleDeposite }) => {
  return (
    <div className="collapse-trigger">
      <div>
        <p className="token-title">{title}</p>
        <p className="wallet-amount">
          <span className="blue-color">{balanceWallet}</span> in your wallet
        </p>
      </div>
      <div className="apy">{`${apy}% apy`}</div>
      <div className="expand-container">
        <div className="stake-btn">{`GET ${title}`}</div>
        <div
          className="stake-btn"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            handleDeposite()
          }}
        >
          Deposite
        </div>

        <span className="expand-btn" name="expand-btn">
          Collapse
          <img
            src="/img/arrow-nav.svg"
            className="expand-btn-open"
            alt="arrow"
          />
        </span>
      </div>
    </div>
  )
}

export default CollapseTriggerOpen
