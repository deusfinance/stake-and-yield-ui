import React from 'react'

const CollapseTrigger = ({
  title,
  category,
  onlyLocking,
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
        {/* {category === 'liquidity' ? (
          <div
            className="stake-btn pointer"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            <a href="">Provide Liquidity</a>
          </div>
        ) : ( */}
        <a
          className="stake-btn pointer"
          onClick={(e) => {
            // e.stopPropagation()
            // e.preventDefault()
            handleCollapseContent('get')
          }}
        >
          <span>{`GET ${title}`}</span>
        </a>
        {/* )} */}
        {onlyLocking ? (
          <a
            className="stake-btn pointer"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              // handleCollapseContent('deposite')
            }}
          >
            <span>{`Deposite ${title}`}</span>
          </a>
        ) : (
          <a
            className="stake-btn pointer"
            onClick={(e) => {
              // e.stopPropagation()
              // e.preventDefault()
              handleCollapseContent('deposite')
            }}
          >
            <span> {`Stake ${title}`}</span>
          </a>
        )}

        <span className="expand-btn pointer" name="expand-btn">
          Expand
          <img src="/img/arrow-nav.svg" alt="arrow" />
        </span>
      </div>
    </div>
  )
}

export default CollapseTrigger
