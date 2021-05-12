import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected } from '../../connectors'
import './bridge.css'
import BridgeBox from './BridgeBox'
import ClaimToken from './ClaimToken'
import Instruction from './Instruction'
import Web3 from 'web3'
import TokenModal from './TokenModal'
import { makeContract } from '../../utils/Stakefun'
import { BSCContract, chains, ETHContract } from './data'
import { abi, BridgeABI } from '../../utils/StakingABI'
import { sendTransaction } from '../../utils/Stakefun'

const Bridge = () => {
  const { account, chainId } = useWeb3React()
  const web3React = useWeb3React()
  const { activate } = web3React
  const [open, setOpen] = React.useState(false)
  const [wrongNetwork, setWrongNetwork] = React.useState(false)
  const [collapse, setCollapse] = React.useState({
    approve: { pending: true, success: false },
    deposit: { pending: false, success: false },
    network: { pending: false, success: false },
    bridge: { pending: false, success: false },
    claim: { pending: false, success: false }
  })

  const [target, setTarget] = React.useState()
  // TODO change chainId
  const [bridge, setBridge] = React.useState({
    from: {
      chain: 'ETH',
      icon: 'DEUS.svg',
      name: 'DEUS',
      chainId: 4,
      tokenId: 1,
      address: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1'
    },
    to: {
      chain: 'BSC',
      icon: 'DEUS.svg',
      name: 'DEUS',
      chainId: 97,
      tokenId: 1,
      address: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6'
    }
  })
  const [fromBalance, setFromBalance] = React.useState(0)
  const [toBalance, setToBalance] = React.useState(0)
  const [fromAmount, setFromAmount] = React.useState(0)
  const [toAmount, setToAmount] = React.useState(0)

  const BSCWeb3 = new Web3(
    new Web3.providers.HttpProvider(
      'https://data-seed-prebsc-1-s1.binance.org:8545/'
    )
  )

  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/4e955a81217a477e88e3793856deb18b'
    )
  )

  React.useEffect(
    () => {
      setWrongNetwork(false)
    },
    [chainId, bridge],
    account
  )
  React.useEffect(() => {
    const getBalance = async () => {
      if (bridge.from.chainId === 4) {
        const fromContract = makeContract(web3, abi, bridge.from.address)
        let fromBalance = await fromContract.methods.balanceOf(account).call()
        fromBalance = web3.utils.fromWei(fromBalance, 'ether')
        setFromBalance(fromBalance)
      }
      if (bridge.to.chainId === 4) {
        const toContract = makeContract(web3, abi, bridge.to.address)
        let toBalance = await toContract.methods.balanceOf(account).call()
        toBalance = web3.utils.fromWei(toBalance, 'ether')
        setToBalance(toBalance)
      }
      if (bridge.from.chainId === 97) {
        const fromContract = makeContract(BSCWeb3, abi, bridge.from.address)
        let fromBalance = await fromContract.methods.balanceOf(account).call()
        fromBalance = BSCWeb3.utils.fromWei(fromBalance, 'ether')
        setFromBalance(fromBalance)

        // let balance = await BSCWeb3.eth.getBalance(account)
        // balance = BSCWeb3.utils.fromWei(balance, 'ether')
      }
      if (bridge.to.chainId === 97) {
        const toContract = makeContract(BSCWeb3, abi, bridge.to.address)
        let toBalance = await toContract.methods.balanceOf(account).call()
        toBalance = BSCWeb3.utils.fromWei(toBalance, 'ether')
        setToBalance(toBalance)
      }
    }
    if (account) getBalance()
  }, [bridge, account, chainId])
  React.useEffect(() => {
    const fetchData = async () => {
      if (bridge.from.chainId === 4) {
        const fromContract = makeContract(web3, abi, bridge.from.address)
        let approve = await fromContract.methods
          .allowance(account, ETHContract)
          .call()
        if (approve !== '0') {
          setCollapse((prev) => {
            return {
              ...prev,
              approve: {
                pending: false,
                success: true
              },
              deposit: { pending: true, success: false }
            }
          })
        }
      }
      if (bridge.to.chainId === 4) {
      }
      if (bridge.from.chainId === 97) {
        const fromContract = makeContract(BSCWeb3, abi, bridge.from.address)
        let approve = await fromContract.methods
          .allowance(account, BSCContract)
          .call()

        if (approve !== '0') {
          setCollapse((prev) => {
            return {
              ...prev,
              approve: {
                pending: false,
                success: true
              },
              deposit: { pending: true, success: false }
            }
          })
        }
      }
      if (bridge.to.chainId === 97) {
      }
    }
    if (account) fetchData()
  }, [bridge.from])
  const handleOpenModal = (data) => {
    setTarget(data)
    setOpen(true)
  }
  const changeToken = (token, chainId) => {
    let chain = chains.find((item) => item.id === chainId).name
    setBridge((prev) => ({
      ...prev,
      [target]: {
        ...token,
        address: token.address[chainId],
        chainId: chainId,
        chain
      }
    }))
  }

  const handleApprove = async () => {
    try {
      if (chainId !== bridge.from.chainId) {
        setWrongNetwork(true)
        return
      }
      if (!account) return
      if (collapse.approve.success) return
      let Contract = ''
      if (bridge.from.chainId === 4) {
        const INFURA_URL =
          'wss://rinkeby.infura.io/ws/v3/4e955a81217a477e88e3793856deb18b'

        const web3 = new Web3(window.ethereum ? window.ethereum : INFURA_URL)
        Contract = makeContract(web3, abi, bridge.from.address)
        let amount = web3.utils.toWei('1000000000000000000')

        sendTransaction(
          Contract,
          `approve`,
          [ETHContract, amount],
          account,
          chainId,
          `Approved ${bridge.from.name}`
        ).then(() => {
          setCollapse((prev) => {
            return {
              ...prev,
              approve: {
                pending: false,
                success: true
              },
              deposit: { pending: true, success: false }
            }
          })
        })
      }
      if (bridge.from.chainId === 97) {
        const URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/'

        const BSCWeb3 = new Web3(window.ethereum ? window.ethereum : URL)
        Contract = makeContract(BSCWeb3, abi, bridge.from.address)
        let amount = BSCWeb3.utils.toWei('1000000000000000000')

        sendTransaction(
          Contract,
          `approve`,
          [BSCContract, amount],
          account,
          chainId,
          `Approved ${bridge.from.name}`
        ).then(() => {
          setCollapse((prev) => {
            return {
              ...prev,
              approve: {
                pending: false,
                success: true
              },
              deposit: { pending: true, success: false }
            }
          })
        })
      }
    } catch (error) {
      console.log('error happend in Approve', error)
    }
  }
  const handleDeposit = () => {
    try {
      if (chainId !== bridge.from.chainId) {
        setWrongNetwork(true)
        return
      }
      // if (!collapse.approve.success) return
      if (!account) {
        return
      }
      if (fromAmount === '0' || fromAmount === '') return
      let network = chains.find(
        (item) => item.id === bridge.from.chainId
      ).network
      if (bridge.from.chainId === 4) {
        const INFURA_URL =
          'wss://rinkeby.infura.io/ws/v3/4e955a81217a477e88e3793856deb18b'

        const web3 = new Web3(window.ethereum ? window.ethereum : INFURA_URL)
        const Contract = makeContract(web3, BridgeABI, ETHContract)
        let amountWie = web3.utils.toWei(fromAmount)

        sendTransaction(
          Contract,
          `deposit`,
          [amountWie, network, bridge.from.tokenId],
          account,
          chainId,
          `Deposite ${fromAmount} ${bridge.from.name}`
        ).then(() => {
          setCollapse((prev) => {
            return {
              ...prev,
              deposit: {
                pending: false,
                success: true
              },
              network: { pending: true, success: false }
            }
          })
        })
      }
      if (bridge.from.chainId === 97) {
        const URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/'

        const BSCWeb3 = new Web3(window.ethereum ? window.ethereum : URL)
        const Contract = makeContract(BSCWeb3, BridgeABI, BSCContract)
        let amountWie = BSCWeb3.utils.toWei(fromAmount)
        sendTransaction(
          Contract,
          `deposit`,
          [amountWie, network, bridge.from.tokenId],
          account,
          chainId,
          `Deposite ${fromAmount} ${bridge.from.name}`
        ).then(() => {
          setCollapse((prev) => {
            return {
              ...prev,
              deposit: {
                pending: false,
                success: true
              },
              network: { pending: true, success: false }
            }
          })
        })
      }
    } catch (error) {
      console.log('error happend in Deposit', error)
    }
  }
  const handleChangeNetwork = () => {
    if (chainId !== bridge.to.chainId) {
      setWrongNetwork(true)
      return
    }
    setCollapse((prev) => {
      return {
        ...prev,
        network: {
          pending: false,
          success: true
        },
        bridge: { pending: true, success: false }
      }
    })
  }
  const handleBridge = async () => {
    if (chainId !== bridge.to.chainId) {
      setWrongNetwork(true)
      return
    }

    if (bridge.from.chainId === 4) {
      const INFURA_URL =
        'https://rinkeby.infura.io/v3/4e955a81217a477e88e3793856deb18b'
      const web3 = new Web3(window.ethereum ? window.ethereum : INFURA_URL)
      const Contract = makeContract(web3, BridgeABI, ETHContract)
      let userTxs = await Contract.methods.getUserTxs(account).call()
      console.log({ userTxs })
    }
    if (bridge.from.chainId === 97) {
      const URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
      const BSCWeb3 = new Web3(window.ethereum ? window.ethereum : URL)
      const Contract = makeContract(BSCWeb3, BridgeABI, BSCContract)
      let userTxs = await Contract.methods.getUserTxs(account).call()
      console.log({ userTxs })
    }

    setCollapse((prev) => {
      return {
        ...prev,
        bridge: {
          pending: false,
          success: true
        },
        claim: { pending: true, success: false }
      }
    })
  }
  const handleClaim = () => {
    if (chainId !== bridge.to.chainId) {
      setWrongNetwork(true)
      return
    }
    setCollapse((prev) => {
      return {
        ...prev,
        claim: { pending: false, success: true },
        approve: { pending: true, success: false }
      }
    })
  }
  const handleConnectWallet = async () => {
    await activate(injected)
  }
  return (
    <>
      <Instruction collapse={collapse} />
      {collapse.claim.pending && <ClaimToken />}
      <div className="container-bridge">
        <div className="bridge-title">
          <h1>DEUS Bridge</h1>
        </div>
        <div className="bridge">
          <img src="/img/bridge/bridge.svg" alt="bridge" />
          <img
            src="/img/bridge/bsc-logo 1.svg"
            alt="bsc-logo"
            className="bsc-logo"
          />
          <img
            src="/img/bridge/Ethereum-icon.svg"
            alt="eth-logo"
            className="eth-logo"
          />
          <img src="/img/bridge/image 1.svg" alt="logo" className="logo" />

          <div className="bridge-box-1">
            <BridgeBox
              title="from"
              {...bridge.from}
              balance={fromBalance}
              amount={fromAmount}
              setAmount={(data) => setFromAmount(data)}
              max={true}
              handleOpenModal={() => handleOpenModal('from')}
            />
          </div>
          <div className="arrow">
            <img src="/img/swap/swap-arrow.svg" alt="arrow" />
          </div>

          <div className="bridge-box-2">
            <BridgeBox
              title="to"
              {...bridge.to}
              balance={toBalance}
              amount={toAmount}
              setAmount={(data) => setToAmount(data)}
              handleOpenModal={() => handleOpenModal('to')}
            />
          </div>
        </div>
        {account ? (
          <>
            {(collapse.approve.pending || collapse.deposit.pending) &&
              !wrongNetwork && (
                <>
                  <div className="container-btn">
                    <div
                      className={
                        collapse.approve.success
                          ? 'bridge-deposit'
                          : 'bridge-approve pointer'
                      }
                      onClick={handleApprove}
                    >
                      Approve
                    </div>

                    <div
                      className={
                        collapse.approve.success
                          ? 'bridge-approve pointer'
                          : 'bridge-deposit'
                      }
                      onClick={handleDeposit}
                    >
                      Deposit
                    </div>
                  </div>
                  <div className="container-status-button">
                    <div className="status-button">
                      <div className="active">1</div>
                      <div className={collapse.approve.success ? 'active' : ''}>
                        2
                      </div>
                    </div>
                  </div>
                </>
              )}
            {collapse.network.pending && !wrongNetwork && (
              <div className="pink-btn" onClick={handleChangeNetwork}>
                CHANGE NETWORK
              </div>
            )}
            {collapse.bridge.pending && !wrongNetwork && (
              <div className="pink-btn" onClick={handleBridge}>
                INITIATE BRIDGING
              </div>
            )}
            {collapse.claim.pending && !wrongNetwork && (
              <div className="pink-btn" onClick={handleClaim}>
                CLAIM TOKEN
              </div>
            )}
            {wrongNetwork && <div className="wrong-network">Wrong Network</div>}
          </>
        ) : (
          <div className="pink-btn" onClick={handleConnectWallet}>
            Connect Wallet
          </div>
        )}

        <TokenModal
          open={open}
          hide={() => setOpen(!open)}
          changeToken={(token, chainId) => changeToken(token, chainId)}
        />
      </div>
    </>
  )
}

export default Bridge
