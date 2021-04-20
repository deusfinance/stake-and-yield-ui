import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { web3 } from '../../utils/Stakefun'
import { injected } from '../../connectors'

const Mint = (props) => {
  const {
    balanceWallet,
    stakingContract,
    StakedTokenContract,
    StakeAndYieldContract,
    fetchData,
    owner,
    approve,
    handleBack
  } = props

  const web3React = useWeb3React()
  const { activate } = web3React
  const [stakeAmount, setStakeAmount] = React.useState('0')

  const handleConnect = async () => {
    try {
      const data = await activate(injected)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleApprove = async () => {
    try {
      if (!owner) {
        return
      }
      let amount = web3.utils.toWei('1000000000')

      await StakedTokenContract.methods
        .approve(stakingContract, amount)
        .send({ from: owner })
        .once('receipt', () => {
          fetchData('approve')
        })
        .on('error', () => console.log('error happend in approve'))
    } catch (error) {
      console.log('Error Happend in Fun approve', error)
    }
  }
  const handleMint = async () => {
    try {
      if (!owner) {
        return
      }
      let amount = web3.utils.toWei(stakeAmount)
    } catch (error) {
      console.log('Error Happend in Fun Stake', error)
    }
  }
  return (
    <>
      <div className="back-btn" onClick={handleBack}>
        Back
      </div>

      <div className="deposite-container">
        <div>
          <p className="lock-text">LOCK TO RECEIVE sTOKENS</p>
        </div>
        <div>
          <p className="balance-wallet"> {`Balance: ${balanceWallet}`}</p>
        </div>
        <div className="gray-box flex-between">
          <input
            type="text"
            className="input-transparent"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
          />
          <span
            className="box-balance-max"
            onClick={() => setStakeAmount(balanceWallet)}
          >
            Max
          </span>
        </div>
        <div className="contract-box">
          <a
            className="show-contract"
            href={`https://ropsten.etherscan.io/address/${stakingContract}#code`}
            target="_blink"
          >
            Show me the contract
          </a>
        </div>
        {!owner && (
          <div
            className="wrap-box-gradient-complete width-415"
            onClick={handleConnect}
          >
            <div>connect wallet</div>
          </div>
        )}
        {owner && (
          <>
            <div className="flex-between">
              {approve == 0 && (
                <div className="approve-btn" onClick={handleApprove}>
                  Approve
                </div>
              )}
              <div className="stake-deposite-btn" onClick={handleMint}>
                Mint
              </div>
            </div>
            <div className="flex-center">
              <div className="container-status-button">
                <div className="active">1</div>
                <div>2</div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Mint
