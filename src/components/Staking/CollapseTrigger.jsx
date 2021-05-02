import React from 'react'

const CollapseTrigger = ({
  title,
  category,
  balancer,
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
        {balancer ? (
          <a
            className="stake-btn pointer"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              window.open(
                'https://pools.balancer.exchange/#/pool/0x1dc2948b6db34e38291090b825518c1e8346938b/',
                '_blank'
              )
            }}
          >
            <span>{`GET ${title}`}</span>
          </a>
        ) : (
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
        )}
        {onlyLocking ? (
          <a
            className="stake-btn pointer"
            target="_blink"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              window.open(
                'https://pools.balancer.exchange/#/pool/0x1dc2948b6db34e38291090b825518c1e8346938b/',
                '_blank'
              )
            }}
          >
            <span>{`Deposit ${title}`}</span>
          </a>
        ) : (
          <a
            className="stake-btn pointer"
            onClick={(e) => {
              // e.stopPropagation()
              // e.preventDefault()
              handleCollapseContent('deposit')
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
