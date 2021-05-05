import React from 'react'
import TokenBadge from './TokenBadge'

const ClaimToken = () => {
  return (
    <div className="claim-token">
      <div className="claim-token-title">CLAIM TOKENS</div>
      <div className="flex-between">
        <div className="token-item">
          <TokenBadge chain="BSC" icon="DEUS.svg" />
          <span>{`DEUS (BSC)`}</span>
        </div>
        <div className="claim-amount">344,342.23244</div>
        <div className="container-claim-btn">
          <div className="claim-btn">Change Network</div>
          <div className="claim-btn">CLAIM</div>
        </div>
      </div>
    </div>
  )
}

export default ClaimToken
