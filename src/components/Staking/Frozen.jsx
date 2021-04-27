import React from 'react'
import { web3 } from '../../utils/Stakefun'
import DrawableAmount from './DrawableAmount'
import WaitingTime from './WaitingTime'
import { CustomTranaction } from '../../utils/explorers'
import { TransactionState } from '../../utils/constant'

const Frozen = (props) => {
  const {
    balance,
    owner,
    chainId,
    title,
    titleExit,
    StakeAndYieldContract,
    withDrawable,
    withDrawableExit,
    withDrawTime,
    showFluid,
    stakeType,
    exit
  } = props

  const [unfreez, setUnfreez] = React.useState('0')

  const handleUnfreeze = () => {
    if (unfreez == 0 || unfreez == '') return

    let amount = web3.utils.toWei(String(unfreez))

    StakeAndYieldContract.methods
      .unfreeze(amount)
      .send({ from: owner })
      .once('transactionHash', (hash) =>
        CustomTranaction(TransactionState.LOADING, {
          hash,
          from: {
            logo: `/img/bridge/${title}.svg`,
            symbol: title
          },
          chainId,
          message: `Unfreeze ${amount} ${title}`
        })
      )
      .once('receipt', ({ transactionHash }) => {
        setUnfreez('0')
        CustomTranaction(TransactionState.SUCCESS, {
          hash: transactionHash,
          from: {
            logo: `/img/bridge/${title}.svg`,
            symbol: title
          },
          chainId,
          message: `Unfreeze ${amount} ${title}`
        })
      })
      .once('error', () =>
        CustomTranaction(TransactionState.FAILED, {
          from: {
            logo: `/img/bridge/${title}.svg`,
            symbol: title
          }
        })
      )
  }
  return (
    <div className="userInfo-container">
      <div className="flex-between mb-15">
        <div className="frozen-desc">
          <p>Frozen </p>
          <p className="opacity-5">
            Tokens that are currently being used as collateral to borrow ETH to
            generate Yield on other protocols.
          </p>
        </div>
        <div>
          <div className="wrap-box mb-15">
            {/* {stakeType != '1' && !exit && (
              <div className="wrap-box-gradient-left">Re-deposit</div>
            )}
            <div
              className={` ${
                stakeType != '1' && !exit
                  ? 'wrap-box-center'
                  : 'wrap-box-gray width-271'
              }`}
            > */}
            <div className="wrap-box-gray width-271">
              <input
                type="text"
                className="input-transparent"
                value={unfreez}
                onChange={(e) => setUnfreez(e.target.value)}
              />
              <span
                onClick={() => setUnfreez(balance)}
                className="opacity-75 pointer flex-align-center"
              >
                MAX
              </span>
            </div>
            <div className="wrap-box-gradient pointer" onClick={handleUnfreeze}>
              Unfreeze
            </div>
          </div>
          {(withDrawable > 0 || withDrawableExit > 0) && (
            <div className="wrap-box mb-15">
              <DrawableAmount
                withDrawable={withDrawable}
                withDrawableExit={withDrawableExit}
                title={title}
                titleExit={titleExit}
                width="width-271"
              />

              <div className="wrap-box-gradient" onClick={handleUnfreeze}>
                <span className="fluid">FLUID IN: </span>
                <span className="hour">
                  <WaitingTime
                    withDrawTime={withDrawTime}
                    showFluid={showFluid}
                  />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Frozen
