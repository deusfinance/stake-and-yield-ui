import React from 'react'
import './bridge.css'
import BridgeBox from './BridgeBox'
import BaseModal from './BaseModal'
import { tokens, chains } from './tokens'
import TokenBadge from './TokenBadge'
import { set } from 'lodash'

const Bridge = () => {
  const [open, setOpen] = React.useState(false)
  const [chainToken, setChainToken] = React.useState([])
  const [searchQuery, setSearchQuery] = React.useState('')
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
    setSearchQuery(search)
  }
  const handleFilter = (e) => {
    if (e.target.checked) {
      setChainToken([...chainToken, e.target.value])
    } else {
      setChainToken(chainToken.filter((id) => id !== e.target.value))
    }
  }
  React.useEffect(() => {
    const search = new RegExp([searchQuery].join(''), 'i')
    const resultFilter = tokens.filter(
      (item) => search.test(item.name) || search.test(item.chain)
    )
    if (chainToken.length === 0) {
      setShowTokens(resultFilter)
    } else {
      setShowTokens(
        resultFilter.filter((token) =>
          chainToken.some((chain) => [token.chain].flat().includes(chain))
        )
      )
    }
  }, [chainToken, searchQuery])
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
            {chains.map((chain, index) => (
              <>
                <input
                  type="checkbox"
                  key={index}
                  id={chain}
                  name={chain}
                  defaultValue={chain}
                  onChange={handleFilter}
                />
                <label htmlFor={chain}>{chain}</label>
              </>
            ))}
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
