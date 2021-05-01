import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import ToggleButtons from './ToggleButtons'
import { web3, sendTransaction } from '../../utils/Stakefun'
import { injected } from '../../connectors'
import { getEtherscanLink } from '../../utils/explorers'

const Deposite = (props) => {
  const {
    title,
    stakeType,
    lockStakeType,
    balanceWallet,
    stakingContract,
    StakedTokenContract,
    StakeAndYieldContract,
    exit,
    owner,
    chainId,
    approve,
    handleBack,
    exitable,
    yieldable
  } = props

  const web3React = useWeb3React()
  const { activate } = web3React
  const [selectedStakeType, setSelectedStakeType] = React.useState(stakeType)
  const [stakeAmount, setStakeAmount] = React.useState('')
  const [exitBtn, setExitBtn] = React.useState(exit)
  const [approveClick, setApproveClick] = React.useState(false)
  const [preApprove, setPreApprove] = React.useState(approve)
  console.log(preApprove)
  React.useEffect(() => {
    setSelectedStakeType(stakeType)
    setExitBtn(exit)
  }, [owner, chainId])

  React.useEffect(() => {
    return () => {
      setPreApprove(approve)
    }
  }, [])

  const chooseTypeStake = (e) => {
    setSelectedStakeType(e.target.value)
  }

  const handleConnect = async () => {
    try {
      const data = await activate(injected)
    } catch (error) {
      console.log(error)
    }
  }

  const handleApprove = () => {
    try {
      if (!owner) {
        return
      }
      let amount = web3.utils.toWei('1000000000000000000')
      sendTransaction(
        StakedTokenContract,
        `approve`,
        [stakingContract, amount],
        owner,
        chainId,
        `Approved ${title}`
      ).then(() => {
        setApproveClick(true)
      })
    } catch (error) {
      console.log('error happend in Approve', error)
    }
  }
  const handleStake = () => {
    try {
      if (!owner) {
        return
      }
      if (stakeAmount == 0 || stakeAmount == '') return
      let amount = web3.utils.toWei(stakeAmount)
      let type = selectedStakeType == '0' ? '1' : selectedStakeType
      sendTransaction(
        StakeAndYieldContract,
        `deposit`,
        [amount, type, exitBtn],
        owner,
        chainId,
        `Staked ${stakeAmount} ${title}`
      ).then(() => {
        setStakeAmount('0')
      })
    } catch (error) {
      console.log('error happend in Stake', error)
    }
  }
  const handleVaultExit = (data) => {
    if (lockStakeType) {
      return
    }
    setExitBtn(data)
  }
  return (
    <>
      {lockStakeType && (
        <div className="back-btn pointer" onClick={handleBack}>
          Back
        </div>
      )}
      <div className="deposite-container">
        <ToggleButtons
          data={[
            {
              title: 'STAKE',
              value: '1',
              disabled: false
            },
            {
              title: 'STAKE & YIELD',
              value: '3',
              tooltip: 'Earn double rewards with Yearn Finance ',
              disabled: yieldable ? false : true
            },
            { title: 'YIELD', value: '2', disabled: yieldable ? false : true }
          ]}
          handleSelectedButton={chooseTypeStake}
          name={`Stake-Yield-${title}`}
          defaultChecked={selectedStakeType == '0' ? '1' : selectedStakeType}
          lockStakeType={lockStakeType}
        />
        {exitable && (
          <div className="vault-exit">
            <div className="vault-exit-title">Vault Exit</div>
            <div className="vault-exit-btn">
              <span
                className={`off-btn ${exitBtn ? 'opacity-25' : ''}  pointer`}
                onClick={() => handleVaultExit(false)}
              >
                OFF
              </span>
              <span
                className={`on-btn ${!!!exitBtn ? 'opacity-25' : ''} pointer`}
                onClick={() => handleVaultExit(true)}
              >
                ON
              </span>
            </div>
          </div>
        )}
        <div>
          <p className="balance-wallet"> {`Balance: ${balanceWallet}`}</p>
        </div>
        <div className="gray-box flex-between">
          <input
            type="text"
            className="input-transparent"
            value={stakeAmount}
            placeholder={`0 ${title}`}
            onChange={(e) => setStakeAmount(e.target.value)}
          />
          <span
            className="pointer"
            onClick={() => setStakeAmount(balanceWallet)}
          >
            MAX
          </span>
        </div>
        <div className="contract-box">
          <a
            className="show-contract pointer"
            href={getEtherscanLink(chainId, stakingContract)}
            target="_blink"
          >
            Show me the contract
          </a>
        </div>

        {owner ? (
          chainId == 1 || chainId == 4 ? (
            <>
              <div className={!preApprove ? 'flex-between' : 'flex-center'}>
                {preApprove == 0 && (
                  <div
                    className={`${
                      !approveClick
                        ? 'approve-btn pointer'
                        : 'stake-deposite-btn'
                    } `}
                    onClick={handleApprove}
                  >
                    Approve
                  </div>
                )}
                <div
                  className={`${
                    approve ? 'approve-btn pointer' : 'stake-deposite-btn'
                  } `}
                  onClick={handleStake}
                >
                  stake
                </div>
              </div>
              {preApprove == 0 && (
                <div className="flex-center">
                  <div className="container-status-button">
                    <div className="active">1</div>
                    <div className={approveClick ? 'active' : ''}>2</div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <a className="wrong-network">
              <span>Wrong Network</span>
            </a>
          )
        ) : (
          <div
            className="wrap-box-gradient-complete width-415 pointer"
            onClick={handleConnect}
          >
            <div>connect wallet</div>
          </div>
        )}
      </div>
    </>
  )
}

export default Deposite
