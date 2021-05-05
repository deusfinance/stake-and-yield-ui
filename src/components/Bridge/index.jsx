import React from 'react'
import './bridge.css'
import BridgeBox from './BridgeBox'
import ClaimToken from './ClaimToken'
import Instruction from './Instruction'

import TokenModal from './TokenModal'

const Bridge = () => {
  const [open, setOpen] = React.useState(false)
  const [collapse, setCollapse] = React.useState({
    approve: { pending: true, success: false },
    deposit: { pending: false, success: false },
    network: { pending: false, success: false },
    bridge: { pending: false, success: false },
    claim: { pending: false, success: false },
    wrongNetwork: { pending: false, success: false }
  })

  const [target, setTarget] = React.useState()
  const [bridge, setBridge] = React.useState({
    from: { chain: 'ETH', icon: 'DEUS.svg', name: 'DEUS' },
    to: { chain: 'BSC', icon: 'DEUS.svg', name: 'DEUS' }
  })

  const handleOpenModal = (data) => {
    setTarget(data)
    setOpen(true)
  }
  const changeToken = (token) => {
    setBridge((prev) => ({ ...prev, [target]: { ...token } }))
  }

  const handleApprove = () => {
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
    setCollapse((prev) => {
      return {
        ...prev,
        claim: {
          pending: false,
          success: true
        },
        wrongNetwork: { pending: true, success: false }
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
        {(collapse.approve.pending || collapse.deposit.pending) && (
          <>
            <div className="container-btn">
              <div className="bridge-approve pointer" onClick={handleApprove}>
                Approve
              </div>

              <div className="bridge-deposit pointer" onClick={handleDeposit}>
                Deposit
              </div>
            </div>
            <div className="container-status-button">
              <div className="status-button">
                <div className="active">1</div>
                <div>2</div>
              </div>
            </div>
          </>
        )}

        {collapse.network.pending && (
          <div className="pink-btn" onClick={handleChangeNetwork}>
            CHANGE NETWORK
          </div>
        )}
        {collapse.bridge.pending && (
          <div className="pink-btn" onClick={handleBridge}>
            INITIATE BRIDGING
          </div>
        )}
        {collapse.claim.pending && (
          <div className="pink-btn" onClick={handleClaim}>
            CLAIM TOKEN
          </div>
        )}
        {collapse.wrongNetwork.pending && (
          <div className="wrong-network">Wrong Network</div>
        )}
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
