import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected } from '../../connectors'
import { VaultsService } from '../../services/VaultsService'

const Mint = (props) => {
  const {
    lockStakeType,
    balanceWallet,
    stakingContract,
    owner,
    handleBack,
    title
  } = props

  const web3React = useWeb3React()
  const { activate, chainId } = web3React
  const [amount, setAmount] = React.useState('0')
  const web3 = new VaultsService(owner, chainId)
  console.log(web3)
  // useEffect(() => {
  //   await this.setState({ web3: new VaultsService(owner, chainId) })

  // }, [])

  const handleConnect = async () => {
    try {
      const data = await activate(injected)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleApprove = async () => {
    if (amount === '' || amount === '0') return
    try {
      // this.setState({ typeTransaction: 'approve' })
      await web3.approve(
        title,
        stakingContract,
        amount,
        console.log('response approve')
      )
    } catch (error) {
      console.log(error)
    }
  }
  const handleMint = async () => {
    if (amount === '' || amount === '0') return
    try {
      // this.setState({ typeTransaction: 'approve' })
      await web3.lock(stakingContract, amount, console.log('response approve'))
    } catch (error) {
      console.log(error)
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
            href={`https://ropsten.etherscan.io/address/${stakingContract}#code`}
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
              <div className="approve-btn pointer" onClick={handleApprove}>
                Approve
              </div>

              <div className="stake-deposite-btn pointer" onClick={handleMint}>
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
