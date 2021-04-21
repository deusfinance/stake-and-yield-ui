import React from 'react'

const TokenBadge = (props) => {
  const { badgeType, icon } = props
  return (
    <div className="notify">
      <img src={`/img/bridge/${icon}`} />
      <span className={`badge badge-${badgeType}`}>{badgeType}</span>
    </div>
  )
}

export default TokenBadge
