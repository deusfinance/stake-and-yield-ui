import React from 'react'
import './bridge.css'
import BridgeBox from './BridgeBox'
import BaseModal from './BaseModal'
import tokens from './tokens'
import TokenBadge from './TokenBadge'

const Bridge = () => {
  const [open, setOpen] = React.useState(false)
  const [target, setTarget] = React.useState()
  const [showTokens, setShowTokens] = React.useState(tokens)
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
  const handleSearchModal = (e) => {
    let search = e.target.value
    search = new RegExp([search].join(''), 'i')

    const resultFilter = tokens.filter(
      (item) => search.test(item.name) || search.test(item.chain)
    )
    setShowTokens(resultFilter)
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
      <BaseModal
        title="Select an asset"
        open={open}
        onRequestClose={() => setOpen(false)}
      >
        <div className="content-modal-bridge">
          <input
            className="input-search"
            placeholder="Type to search"
            onChange={handleSearchModal}
          />
          <div className="filter">Filter</div>
          <div className="bridge-checkbox">
            <input type="checkbox" id="ETH" name="ETH" defaultValue="ETH" />
            <label htmlFor="ETH">ETH</label>
            <input type="checkbox" id="BSC" name="BSC" defaultValue="BSC" />
            <label htmlFor="BSC">BSC</label>
          </div>
          <div className="border-bottom"></div>
          <div className="flex-between token-name">
            <div>Token name</div>
            <div>Balance</div>
          </div>
          <div className="border-bottom mb-5"></div>
          <div className="pt-20">
            {showTokens.map((token, index) => (
              <div
                className="token-list"
                key={index}
                onClick={() => {
                  changeToken(token)
                  setOpen(false)
                }}
              >
                <div className="token-list-item">
                  <TokenBadge chain={token.chain} icon={token.icon} />
                  <span>{`${token.name} (${token.chain})`}</span>
                </div>
                <div>{token.balance}</div>
              </div>
            ))}
          </div>
        </div>
      </BaseModal>
    </div>
  )
}

export default Bridge
