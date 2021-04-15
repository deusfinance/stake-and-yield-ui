import React from 'react'

const DepositBtn = (props) => {
  const { onClickDeposite } = props
  return (
    <div className="deposit-btn-conatiner">
      <div className="flex-between">
        <div className="wrap-box-gradient-complete deposit-btn">
          <div className="fluid-box-content">GET</div>
        </div>
        <div
          className="wrap-box-gradient-complete deposit-btn"
          onClick={() => onClickDeposite()}
        >
          <div className="fluid-box-content">DEPOSIT</div>
        </div>
      </div>
    </div>
  )
}

export default DepositBtn
