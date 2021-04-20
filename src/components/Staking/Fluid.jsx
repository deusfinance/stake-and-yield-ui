import React from 'react'
import DrawableAmount from './DrawableAmount'

const Fluid = (props) => {
  const {
    withDrawable,
    withDrawableExit,
    owner,
    title,
    titleExit,
    StakeAndYieldContract,
    fetchData,
    exit,
    showFluid
  } = props

  const handleWithDraw = async () => {
    try {
      await StakeAndYieldContract.methods
        .withdrawUnfreezed()
        .send({ from: owner })
        .once('receipt', () => {
          fetchData('withdrawUnfreezed')
          showFluid()
        })
    } catch (error) {
      console.log('Error happend in WithDraw Fluid', error)
    }
  }
  return (
    <div className="userInfo-container">
      <div className="flex-between">
        <div className="frozen-desc">
          <p>Fluid</p>
          <p className="opacity-5">
            Tokens that are available to withdraw, as the ETH has already been
            withdrawn back into the treasury.
          </p>
        </div>
        <div className="wrap-box mb-15">
          <DrawableAmount
            withDrawable={withDrawable}
            withDrawableExit={withDrawableExit}
            title={title}
            titleExit={titleExit}
            width="width-402 border-radius-6"
          />
          {/* <div
            className={`${
              exit ? 'wrap-box-gray-complete' : 'wrap-box-gray-complete-exit'
            }`}
          >
            {exit && <div>{`${withDrawable} ${title} +`}</div>}
            <div>{`${withDrawableExit} ${titleExit}`}</div>
            <div></div>
          </div> */}
        </div>
      </div>
      <div className="fluid-footer-container">
        {/* <div
          className={` mb-15 ${exit ? 'fluid-footer' : 'fluid-footer-exit'}`}
        >
          {exit && <div>currently redeemable Vault tokens</div>}
          <div>currently claimable Reward tokens</div>
          <div>currently unfrozen withdrawable Staked tokens</div>
        </div> */}
        <div className="wrap-box float-right">
          {/* {exit ? (
            <div
              className="wrap-box-gradient-complete"
              onClick={handleWithDraw}
            >
              <div className="fluid-box-content">Withdraw + Claim + Redeem</div>
            </div>
          ) : ( */}
          <div
            className="wrap-box-gradient-complete width-402 pointer"
            onClick={handleWithDraw}
          >
            <div className="fluid-box-content">Withdraw + Claim</div>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  )
}

export default Fluid
