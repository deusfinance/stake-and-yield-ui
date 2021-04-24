import React from 'react'

const CollapseTrigger = ({
  title,
  apy,
  balanceWallet,
  handleCollapseContent
}) => {
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
        <div
          className="stake-btn pointer"
          onClick={(e) => {
            // e.stopPropagation()
            // e.preventDefault()
            handleCollapseContent('get')
          }}
        >{`GET ${title}`}</div>
        <div
          className="stake-btn pointer"
          onClick={(e) => {
            // e.stopPropagation()
            // e.preventDefault()
            handleCollapseContent('deposite')
          }}
        >
          Deposite
        </div>

        <span className="expand-btn pointer" name="expand-btn">
          Expand
          <img src="/img/arrow-nav.svg" alt="arrow" />
        </span>
      </div>
    </div>
  )
}

export default CollapseTrigger
