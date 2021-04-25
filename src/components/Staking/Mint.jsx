import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected } from '../../connectors'
import { web3 } from '../../utils/Stakefun'
import {
  ApproveTranaction,
  getEtherscanLink,
  CustomTranaction
} from '../../utils/explorers'
import { TransactionState } from '../../utils/constant'

const Mint = (props) => {
  const {
    lockStakeType,
    balanceWallet,
    owner,
    chainId,
    handleBack,
    vaultContract,
    VaultContract,
    StakedTokenContract,
    title,
    approveVault,
    fetchData
  } = props

  const web3React = useWeb3React()
  const { activate } = web3React
  const [amount, setAmount] = React.useState('')
  const [approveClick, setApproveClick] = React.useState(false)
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
      let amount = web3.utils.toWei('1000000000000000000')
      await StakedTokenContract.methods
        .approve(vaultContract, amount)
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
          setApproveClick(true)
          // fetchData('approveMint')
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
        .once('error', (error) => {
          CustomTranaction(TransactionState.FAILED, {
            from: {
              logo: `/img/bridge/${title}.svg`,
              symbol: title,
              amount
            },
            chainId
          })
        })
    } catch (error) {
      console
        .log('Error Happend in Fun approve', error)
        .once('error', (error) => {
          CustomTranaction(TransactionState.FAILED, {
            from: {
              logo: `/img/bridge/${title}.svg`,
              symbol: title,
              amount
            },
            chainId
          })
        })
    }
  }
  const handleMint = async () => {
    try {
      if (!owner) {
        return
      }
      if (amount === '' || amount === '0') return
      let amountVault = web3.utils.toWei(amount)
      console.log(amountVault)
      await VaultContract.methods
        .lock(amountVault)
        .send({ from: owner })
        .once('transactionHash', (hash) =>
          CustomTranaction(TransactionState.LOADING, {
            hash,
            from: {
              logo: `/img/bridge/${title}.svg`,
              symbol: title,
              amount
            },
            chainId,
            message: `Mint ${amount} ${title}`
          })
        )
        .once('receipt', ({ transactionHash }) => {
          setAmount('')
          console.log({ transactionHash })
          CustomTranaction(TransactionState.SUCCESS, {
            hash: transactionHash,
            from: {
              logo: `/img/bridge/${title}.svg`,
              symbol: title,
              amount
            },
            chainId,
            message: `Mint ${amount} ${title}`
          })
          fetchData('Mint')
        })
        .once('error', (hash) =>
          CustomTranaction(TransactionState.FAILED, {
            from: {
              logo: `/img/bridge/${title}.svg`,
              symbol: title
            },
            chainId
          })
        )
    } catch (error) {
      console.log(error)
      CustomTranaction(TransactionState.FAILED, {
        from: {
          logo: `/img/bridge/${title}.svg`,
          symbol: title,
          amount
        },
        chainId
      })
    }
  }
  return (
    <>
      {lockStakeType && (
        <div className="back-btn pointer" onClick={handleBack}>
          Back
        </div>
      )}

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
            placeholder="0 DEA"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span
            className="box-balance-max pointer"
            onClick={() => setAmount(balanceWallet)}
          >
            Max
          </span>
        </div>
        <div className="contract-box">
          <a
            className="show-contract pointer"
            href={getEtherscanLink(vaultContract)}
            target="_blink"
          >
            Show me the contract
          </a>
        </div>
        <div className="convert-box-mint">
          <span>mint 1.345646 sDEA</span>
        </div>
        <div className="convert-box-mint">
          <span>mint 8000 TIME</span>
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
            <div className={!approveVault ? 'flex-between' : 'flex-center'}>
              {approveVault == 0 && (
                <div
                  className={`${
                    !approveClick ? 'approve-btn' : 'stake-deposite-btn'
                  } pointer`}
                  onClick={handleApprove}
                >
                  Approve
                </div>
              )}

              <div
                className={`${
                  approveClick ? 'approve-btn' : 'stake-deposite-btn'
                } pointer`}
                onClick={handleMint}
              >
                Mint
              </div>
            </div>
            {approveVault == 0 && (
              <div className="flex-center">
                <div className="container-status-button">
                  <div className="active">1</div>
                  <div className={approveClick ? 'active' : ''}>2</div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Mint
