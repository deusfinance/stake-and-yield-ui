import React from 'react'
import { useWeb3React } from '@web3-react/core'
import ToggleButtons from './ToggleButtons'
import { web3 } from '../../utils/Stakefun'
import { injected } from '../../connectors'
import {
  ApproveTranaction,
  CustomTranaction,
  getEtherscanLink
} from '../../utils/explorers'
import { TransactionState } from '../../utils/constant'

const Deposite = (props) => {
  const {
    title,
    stakeType,
    lockStakeType,
    balanceWallet,
    stakingContract,
    StakedTokenContract,
    StakeAndYieldContract,
    fetchData,
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
  const [stakeAmount, setStakeAmount] = React.useState('0')
  const [exitBtn, setExitBtn] = React.useState(exit)

  React.useEffect(() => {
    setSelectedStakeType(stakeType)
    setExitBtn(exit)
  }, [owner])

  const chooseTypeStake = (e) => {
    setSelectedStakeType(e.target.value)
  }

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
        .once('transactionHash', (hash) =>
          ApproveTranaction(TransactionState.LOADING, {
            hash,
            from: {
              logo: `/img/bridge/${title}.svg`,
              symbol: title,
              amount
            },
            chainId
          })
        )
        .once('receipt', ({ transactionHash }) => {
          fetchData('approve')
          ApproveTranaction(TransactionState.SUCCESS, {
            hash: transactionHash,
            from: {
              logo: `/img/bridge/${title}.svg`,
              symbol: title,
              amount
            },
            chainId
          })
        })
        .once('error', (hash) =>
          ApproveTranaction(TransactionState.FAILED, {
            hash,
            from: {
              logo: `/img/bridge/${title}.svg`,
              symbol: title,
              amount
            },
            chainId
          })
        )
    } catch (error) {
      console.log('Error Happend in Fun approve', error)
    }
  }
  const handleStake = async () => {
    try {
      if (!owner) {
        return
      }
      let amount = web3.utils.toWei(stakeAmount)
      let type = selectedStakeType == '0' ? '1' : selectedStakeType
      await StakeAndYieldContract.methods
        .deposit(amount, type, exitBtn)
        .send({ from: owner })
        .once('transactionHash', (hash) =>
          CustomTranaction(TransactionState.LOADING, {
            hash,
            from: {
              logo: `/img/bridge/${title}.svg`,
              symbol: title,
              stakeAmount
            },
            chainId,
            message: `Staked ${stakeAmount} ${title}`
          })
        )
        .once('receipt', ({ transactionHash }) => {
          setStakeAmount('')
          console.log({ transactionHash })
          CustomTranaction(TransactionState.SUCCESS, {
            hash: transactionHash,
            from: {
              logo: `/img/bridge/${title}.svg`,
              symbol: title,
              stakeAmount
            },
            chainId,
            message: `Staked ${stakeAmount} ${title}`
          })
          fetchData('stake')
        })
        .once('error', (hash) =>
          CustomTranaction(TransactionState.FAILED, {
            hash,
            from: {
              logo: `/img/bridge/${title}.svg`,
              symbol: title,
              amount
            },
            chainId
          })
        )
    } catch (error) {
      console.log('Error Happend in Fun Stake', error)
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
              tooltip: 'earn double rewards',
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
        {!owner && (
          <div
            className="wrap-box-gradient-complete width-415 pointer"
            onClick={handleConnect}
          >
            <div>connect wallet</div>
          </div>
        )}
        {owner && (
          <>
            <div className="flex-between">
              {approve == 0 && (
                <div className="approve-btn pointer" onClick={handleApprove}>
                  Approve
                </div>
              )}
              <div className="stake-deposite-btn pointer" onClick={handleStake}>
                stake
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

export default Deposite
