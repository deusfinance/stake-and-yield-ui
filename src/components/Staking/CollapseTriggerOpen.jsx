import React from 'react'

const CollapseTriggerOpen = ({
  title,
  category,
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
        {category === 'liquidity' ? (
          <div
            className="stake-btn pointer"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            <a href="">Provide Liquidity</a>
          </div>
        ) : (
          <div
            className="stake-btn pointer"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              handleCollapseContent('get')
            }}
          >
            GET
          </div>
        )}
        <div
          className="stake-btn pointer"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            handleCollapseContent('deposite')
          }}
        >
          Deposite
        </div>

        <span className="expand-btn pointer" name="expand-btn">
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
