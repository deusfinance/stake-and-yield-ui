import React from 'react'
import { useWeb3React } from '@web3-react/core'

import './bridge.css'
import BridgeBox from './BridgeBox'
import ClaimToken from './ClaimToken'
import Instruction from './Instruction'

import TokenModal from './TokenModal'

const Bridge = () => {
  const { chainId } = useWeb3React()
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
    from: { chain: 'ETH', icon: 'DEUS.svg', name: 'DEUS', chainId: 4 },
    to: { chain: 'BSC', icon: 'DEUS.svg', name: 'DEUS', chainId: 97 }
  })

  React.useEffect(() => {
    setWrongNetwork(false)
  }, [chainId, bridge])

  const handleOpenModal = (data) => {
    setTarget(data)
    setOpen(true)
  }
  const changeToken = (token) => {
    setBridge((prev) => ({ ...prev, [target]: { ...token } }))
  }

  const handleApprove = () => {
    if (chainId !== bridge.from.chainId) {
      setWrongNetwork(true)
      return
    }
    if (collapse.approve.success) return
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
  const handleDeposit = () => {
    if (chainId !== bridge.from.chainId) {
      setWrongNetwork(true)
      return
    }
    if (!collapse.approve.success) return

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
  const handleBridge = () => {
    if (chainId !== bridge.to.chainId) {
      setWrongNetwork(true)
      return
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
              handleOpenModal={() => handleOpenModal('to')}
            />
          </div>
        </div>
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
        <TokenModal
          open={open}
          hide={() => setOpen(!open)}
          changeToken={(token) => changeToken(token)}
        />
      </div>
    </>
  )
}

export default Bridge
