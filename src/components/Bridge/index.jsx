import React from 'react'
import './bridge.css'
import BridgeBox from './BridgeBox'

import TokenModal from './TokenModal'

const Bridge = () => {
  const [open, setOpen] = React.useState(false)
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

  const handleApprove = () => {}
  const handleWarp = () => {}
  return (
    <div className="container-bridge">
      <div className="bridge-title">
        <h1>DEUS Bridge</h1>
      </div>
      <div className="bridge">
        <img src="/img/bridge/bridge.svg" />
        <div className="bridge-box-1">
          <BridgeBox
            title="from"
            {...bridge.from}
            max={true}
            handleOpenModal={() => handleOpenModal('from')}
          />
        </div>
        <div className="bridge-box-2">
          <BridgeBox
            title="to"
            {...bridge.to}
            handleOpenModal={() => handleOpenModal('to')}
          />
        </div>
      </div>
      <div className="flex-between mt-100">
        <div className="bridge-approve pointer" onClick={handleApprove}>
          Approve
        </div>

        <div className="bridge-warp pointer" onClick={handleWarp}>
          Warp
        </div>
      </div>
      <TokenModal
        open={open}
        hide={() => setOpen(!open)}
        changeToken={(token) => changeToken(token)}
      />
    </div>
  )
}

export default Bridge
