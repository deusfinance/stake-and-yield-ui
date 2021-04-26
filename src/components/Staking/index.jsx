import React from 'react'
import { useWeb3React } from '@web3-react/core'

import './style.css'

import ToggleButtons from './ToggleButtons'
import TokenContainer from './TokenContainer'
import tokens from './Data'

const Staking = () => {
  const { account, chainId } = useWeb3React()

  const [showTokens, setShowTokens] = React.useState(tokens[chainId])
  const [selesctedChainId, setSelesctedChainId] = React.useState(chainId)
  const [type, setType] = React.useState('all')

  React.useEffect(() => {
    setType('all')
    let selectedChainId = chainId == 4 ? chainId : 1
    setShowTokens(tokens[selectedChainId])
    setSelesctedChainId(selectedChainId)
  }, [account, chainId])

  const chooseType = (e) => {
    let category = e.target.value
    setType(category)
    let result =
      category === 'all'
        ? tokens[selesctedChainId]
        : tokens[selesctedChainId].filter((token) => token.category == category)
    setShowTokens(result)
  }

  return (
    <div className="container-staking">
      <div className="staking-desc">
        <div className="title">Staking</div>
        <p>
          Stake your locked DEUS/DEA, your Time Tokens or Balancer Liquidity to
          earn trading fees.
        </p>
        <p>
          You can also opt for Stake+Yield where the underlying ETH value of
          your stake will be used to earn yield on yearn finance –{' '}
          <span className="blue-color">basically double rewards!</span>
        </p>
      </div>
      <div className="staking-content">
        <ToggleButtons
          data={[
            { title: 'SINGLE', value: 'single' },
            { title: 'ALL', value: 'all' },
            { title: 'LIQUIDITY', value: 'liquidity' }
          ]}
          handleSelectedButton={chooseType}
          name="Single-Liquidity"
          defaultChecked={type}
        />

        <div className="wrap-tokens">
          {showTokens.map((token, index) => (
            <TokenContainer
              key={index}
              {...token}
              owner={account}
              chainId={chainId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Staking
