import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected } from '../../connectors'
import { getEtherscanLink } from '../../utils/explorers'
import abis from '../../services/abis.json'
import { web3, makeContract, sendTransaction } from '../../utils/Stakefun'
import addresses from '../../services/addresses.json'

const Mint = (props) => {
  const {
    onlyLocking,
    lockStakeType,
    owner,
    chainId,
    handleBack,
    balanceToken,
    // vaultContract,
    ContractToken,
    title,
    titleExit,
    tokenName,
    tokenAddress
  } = props

  const web3React = useWeb3React()
  const { activate } = web3React
  const [amount, setAmount] = React.useState('')
  const [approve, setApprove] = React.useState(false)
  const [contractLink, setContractLink] = React.useState('')
  const [approveClick, setApproveClick] = React.useState(false)
  const [sealedTime, setSealedTime] = React.useState({
    sealed: '0',
    time: '0'
  })

  React.useEffect(() => {
    if (owner && tokenName && tokenAddress) {
      fetchData()
    }
    // let subscription = web3.eth.subscribe(
    //   'newBlockHeaders',
    //   function (error, result) {
    //     if (!error && owner && vaultContract) {
    //       checkApprove()
    //       return
    //     }
    //     console.error(error)
    //   }
    // )

    // // unsubscribes the subscription
    // subscription.unsubscribe(function (error, success) {
    //   if (success) {
    //     console.log('Successfully unsubscribed!')
    //   }
    // })
  }, [owner, chainId, tokenName, tokenAddress])

  const fetchData = async () => {
    let allowance = await ContractToken.methods
      .allowance(owner, addresses['vaults'][tokenName][chainId])
      .call()
    allowance = Number(web3.utils.fromWei(allowance, 'ether'))
    let link = getEtherscanLink(
      chainId,
      addresses['vaults'][tokenName][chainId]
    )
    setContractLink(link)
    setApprove(approve)
  }

  const getSealedTimeAmount = async (amount) => {
    try {
      setAmount(amount)
      if (amount && owner) {
        const VaultContract = makeContract(
          abis['vaults'],
          addresses['vaults'][tokenName][chainId]
        )
        amount = web3.utils.toWei(amount)
        const result = await VaultContract.methods
          .sealedAndTimeAmount(owner, amount)
          .call()
        setSealedTime({
          sealed: web3.utils.fromWei(result[0], 'ether'),
          time: web3.utils.fromWei(result[1], 'ether')
        })
      } else {
        setSealedTime({
          sealed: 0,
          time: 0
        })
      }
    } catch (error) {
      console.log('error happend in GetSealedTime ', error)
    }
  }

  const handleConnect = async () => {
    try {
      await activate(injected)
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
        ContractToken,
        `approve`,
        [addresses['vaults'][tokenName][chainId], amount],
        owner,
        chainId,
        `Approved ${title}`
      ).then(() => {
        setApproveClick(true)
      })
    } catch (error) {
      console.log('error happend in Approve lock', error)
    }
  }
  const handleMint = () => {
    try {
      if (!owner) {
        return
      }
      if (amount === '' || amount === '0') return
      let amountVault = web3.utils.toWei(amount)
      const VaultContract = makeContract(
        abis['vaults'],
        addresses['vaults'][tokenName][chainId]
      )
      sendTransaction(
        VaultContract,
        `lock`,
        [amountVault],
        owner,
        chainId,
        `Mint ${amount} ${title}`
      ).then(() => {
        // setAmount('0')
      })
    } catch (error) {
      console.log('error happend in Mint', error)
    }
  }
  return (
    <>
      {onlyLocking && lockStakeType && (
        <div className="back-btn pointer" onClick={handleBack}>
          Back
        </div>
      )}

      <div className="deposit-container">
        {title === 'TIME' ? (
          <p>HOW GET TIME</p>
        ) : (
          <>
            <div>
              <p className="lock-text">LOCK TO RECEIVE sTOKENS</p>
            </div>
            <div>
              <p className="balance-wallet"> {`Balance: ${balanceToken}`}</p>
            </div>
            <div className="gray-box flex-between">
              <input
                type="text"
                className="input-transparent"
                placeholder={`0 ${titleExit}`}
                value={amount}
                onChange={(e) => {
                  getSealedTimeAmount(e.target.value)
                }}
              />
              <span
                className="box-balance-max pointer"
                onClick={() => {
                  getSealedTimeAmount(balanceToken)
                }}
              >
                Max
              </span>
            </div>
            <div className="contract-box">
              <a
                className="show-contract pointer"
                href={contractLink}
                target="_blink"
              >
                Show me the contract
              </a>
            </div>
            <div className="convert-box-mint">
              <span>{`mint ${sealedTime.sealed} ${title}`}</span>
            </div>
            <div className="convert-box-mint">
              <span>{`mint ${sealedTime.time} TIME`}</span>
            </div>

            {owner ? (
              chainId == 1 || chainId == 4 ? (
                <>
                  <div className={!approve ? 'flex-between' : 'flex-center'}>
                    {approve == 0 && (
                      <div
                        className={`${
                          !approveClick ? 'approve-btn' : 'stake-deposit-btn'
                        } pointer`}
                        onClick={handleApprove}
                      >
                        Approve
                      </div>
                    )}

                    <div
                      className={`${
                        approveClick
                          ? 'approve-btn pointer'
                          : 'stake-deposit-btn'
                      } ${approve ? 'pointer approve-btn' : ''}`}
                      onClick={handleMint}
                    >
                      Mint
                    </div>
                  </div>
                  {approve == 0 && (
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
          </>
        )}
      </div>
    </>
  )
}

export default Mint
