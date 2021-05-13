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
import useWeb3 from '../../helper/useWeb3'
import { set } from 'lodash'

const Bridge = () => {
  const { account, chainId } = useWeb3React()
  const web3React = useWeb3React()
  const { activate } = web3React
  const [open, setOpen] = React.useState(false)
  const [claims, setClaims] = React.useState([])
  const [currentTx, setCurrentTx] = React.useState('')
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
      tokenId: '1',
      address: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1'
    },
    to: {
      chain: 'BSC',
      icon: 'DEUS.svg',
      name: 'DEUS',
      chainId: 97,
      tokenId: '1',
      address: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6'
    }
  })
  const [fromBalance, setFromBalance] = React.useState(0)
  const [toBalance, setToBalance] = React.useState(0)
  const [amount, setAmount] = React.useState(0)
  const [fetch, setFetch] = React.useState('')
  const web3 = useWeb3()

  const bscWeb3 = new Web3(
    new Web3.providers.HttpProvider(
      'https://data-seed-prebsc-1-s1.binance.org:8545/'
    )
  )

  const ethWeb3 = new Web3(
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
      let bridgeWeb3 = ''
      let bridgeToWeb3 = ''
      let bridgeContract = ''

      switch (chainId) {
        case 4:
          bridgeContract = ETHContract
          break
        case 97:
          bridgeContract = BSCContract
          break
        default:
          break
      }

      switch (bridge.from.chainId) {
        case 4:
          bridgeWeb3 = ethWeb3
          break
        case 97:
          bridgeWeb3 = bscWeb3
          break
        default:
          break
      }
      switch (bridge.to.chainId) {
        case 4:
          bridgeToWeb3 = ethWeb3
          break
        case 97:
          bridgeToWeb3 = bscWeb3
          break
        default:
          break
      }

      const fromContract = makeContract(bridgeWeb3, abi, bridge.from.address)
      let fromBalance = await fromContract.methods.balanceOf(account).call()
      fromBalance = web3.utils.fromWei(fromBalance, 'ether')
      setFromBalance(fromBalance)
      const toContract = makeContract(bridgeToWeb3, abi, bridge.to.address)
      let toBalance = await toContract.methods.balanceOf(account).call()
      toBalance = web3.utils.fromWei(toBalance, 'ether')
      setToBalance(toBalance)

      const Contract = makeContract(web3, BridgeABI, bridgeContract)
      let userTxs = await Contract.methods.getUserTxs(account).call()
      let pendingTxs = await Contract.methods.pendingTxs(userTxs).call()
      const pendingIndex = pendingTxs.reduce(
        (out, bool, index) => (bool ? out : out.concat(index)),
        []
      )
      let claims = []
      for (let index = 0; index < pendingIndex.length; index++) {
        const element = userTxs[pendingIndex[index]]
        let claim = await Contract.methods.txs(element).call()
        claims.push(claim)
      }
      setClaims(claims)
      console.log({ pendingTxs, pendingIndex, claims })
    }
    if (account) getBalance()
  }, [bridge, account, chainId, fetch])

  React.useEffect(() => {
    const fetchData = async () => {
      if (bridge.from.chainId === 4) {
        const fromContract = makeContract(ethWeb3, abi, bridge.from.address)
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
        const fromContract = makeContract(bscWeb3, abi, bridge.from.address)
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
      let Contract = makeContract(web3, abi, bridge.from.address)
      let amount = web3.utils.toWei('1000000000000000000')
      let bridgeContract = ''

      switch (bridge.from.chainId) {
        case 4:
          bridgeContract = ETHContract
          break
        case 97:
          bridgeContract = BSCContract
          break
        default:
          break
      }

      sendTransaction(
        Contract,
        `approve`,
        [bridgeContract, amount],
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
      if (!collapse.approve.success) return
      if (!account) {
        return
      }
      if (amount === '0' || amount === '') return
      let network = chains.find((item) => item.id === bridge.to.chainId).network

      let bridgeContract = ''

      switch (bridge.from.chainId) {
        case 4:
          bridgeContract = ETHContract
          break
        case 97:
          bridgeContract = BSCContract
          break
        default:
          break
      }
      const Contract = makeContract(web3, BridgeABI, bridgeContract)
      let amountWie = web3.utils.toWei(amount)

      sendTransaction(
        Contract,
        `deposit`,
        [amountWie, network, bridge.from.tokenId],
        account,
        chainId,
        `Deposite ${amount} ${bridge.from.name}`
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

    let bridgeContract = ''
    let bridgeWeb3 = ''

    switch (bridge.from.chainId) {
      case 4:
        bridgeContract = ETHContract
        bridgeWeb3 = ethWeb3
        break
      case 97:
        bridgeContract = BSCContract
        bridgeWeb3 = bscWeb3
        break
      default:
        break
    }

    const Contract = makeContract(bridgeWeb3, BridgeABI, bridgeContract)
    let userTxs = await Contract.methods.getUserTxs(account).call()
    let pendingTxs = await Contract.methods.pendingTxs(userTxs).call()
    let currentPending = pendingTxs[pendingTxs.length - 1]
    console.log('**************', currentPending, userTxs[currentPending])
    if (!currentPending) {
      setCurrentTx(userTxs[userTxs.length - 1])
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
  const handleClaim = async () => {
    if (chainId !== bridge.to.chainId) {
      setWrongNetwork(true)
      return
    }
    let bridgeContract = ''

    switch (chainId) {
      case 4:
        bridgeContract = ETHContract
        break
      case 97:
        bridgeContract = BSCContract
        break
      default:
        break
    }
    let amountWie = web3.utils.toWei(amount)
    let network = chains.find((item) => item.id === bridge.to.chainId).network

    const Contract = makeContract(web3, BridgeABI, bridgeContract)
    console.log({
      account,
      amountWie,
      network,
      tokenId: bridge.from.tokenId,
      currentTx
    })
    sendTransaction(
      Contract,
      `claim`,
      [account, amountWie, network, bridge.from.tokenId, currentTx],
      account,
      chainId,
      `Claim ${amount} ${bridge.to.chain}`
    ).then(() => {
      set(`${currentTx}-claim`)
      setCollapse({
        approve: { pending: false, success: true },
        deposit: { pending: true, success: false },
        network: { pending: false, success: false },
        bridge: { pending: false, success: false },
        claim: { pending: false, success: false }
      })
    })
  }
  const handleConnectWallet = async () => {
    await activate(injected)
  }
  return (
    <>
      <Instruction collapse={collapse} />
      <ClaimToken
        claims={claims}
        chainId={chainId}
        account={account}
        setFetch={(data) => setFetch(data)}
      />
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
              amount={amount}
              setAmount={(data) => setAmount(data)}
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
              amount={amount}
              readonly={true}
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
