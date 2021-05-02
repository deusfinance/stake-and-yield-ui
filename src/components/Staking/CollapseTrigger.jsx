import React from 'react'
import ActionButton from './ActionButton'

const CollapseTrigger = ({
  title,
  titleExit,
  category,
  balancer,
  link,
  onlyLocking,
  apy,
  balanceWallet,
  handleCollapseContent
}) => {
  const handleGet = (e) => {
    if (link) {
      e.stopPropagation()
      e.preventDefault()
      window.open(link, '_blank')
    } else {
      handleCollapseContent('lock')
    }
  }
  const handleLock = (e) => {
    if (balancer) {
      e.stopPropagation()
      e.preventDefault()
      window.open(link, '_blank')
    } else {
      handleCollapseContent('lock')
    }
  }
  const handleStake = (e) => {
    if (onlyLocking) {
      e.stopPropagation()
      e.preventDefault()
      window.open(
        'https://pools.balancer.exchange/#/pool/0x1dc2948b6db34e38291090b825518c1e8346938b/',
        '_blank'
      )
    } else {
      handleCollapseContent('stake')
    }
  }
  return (
    <div className="collapse-trigger">
      <div>
        <p className="token-title">{title}</p>
        <p className="wallet-amount">
          <span className="blue-color">{balanceWallet}</span> in your wallet
        </p>
      </div>
      {onlyLocking ? (
        <div className="swap-BPT">swap to BPT and stake for APY</div>
      ) : (
        <div className="apy">{`${apy}% apy`}</div>
      )}

      <div className="expand-container">
        <ActionButton
          type="GET"
          title={titleExit}
          onlyLocking={onlyLocking}
          onClick={handleGet}
        />
        <ActionButton
          type="LOCK"
          title={titleExit}
          onlyLocking={onlyLocking}
          onClick={handleLock}
        />
        <ActionButton
          type="STAKE"
          title={title}
          onlyLocking={onlyLocking}
          onClick={handleStake}
        />

        <span className="expand-btn pointer" name="expand-btn">
          Expand
          <img src="/img/arrow-nav.svg" alt="arrow" />
        </span>
      </div>
    </div>
  )
}

export default CollapseTrigger
