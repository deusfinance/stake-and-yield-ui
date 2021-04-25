import React from 'react'
import { useWeb3React } from '@web3-react/core'

import './style.css'

import ToggleButtons from './ToggleButtons'
import { web3 } from '../../utils/Stakefun'
import TokenContainer from './TokenContainer'
import tokens from './Data'

const Staking = () => {
  const [tvl, setTvl] = React.useState('')
  const [vaultsAmount, setVaultsAmount] = React.useState('')
  const [showTokens, setShowTokens] = React.useState(tokens)
  const [type, setType] = React.useState('all')
  const { account, chainId } = useWeb3React()
  React.useEffect(() => {
    // getTVL()
    setType('all')
    setShowTokens(tokens)
  }, [account, chainId])

  // const getTVL = async () => {
  //   const url = 'https://app.deus.finance/tvl.json'
  //   try {
  //     const resp = await fetch(url)
  //     const result = await resp.json()
  //     const intResult = parseFloat(result.stakingLockedValue)
  //     const vaults = parseFloat(result.vaultLockedValue)

  //     var formatter = new Intl.NumberFormat('en-US', {
  //       style: 'currency',
  //       currency: 'USD',
  //       minimumFractionDigits: 0
  //     })
  //     setTvl(formatter.format(intResult))
  //     setVaultsAmount(formatter.format(vaults))
  //   } catch (error) {
  //     console.log('fetch ' + url + ' had some error', error)
  //   }
  // }
  const chooseType = (e) => {
    let category = e.target.value
    setType(category)
    let result =
      category === 'all'
        ? tokens
        : tokens.filter((token) => token.category == category)
    setShowTokens(result)
  }
  return (
    <div className="container-staking">
      {/* <div className="tvl-container">
        <div>TVL: {tvl}</div>
        <div className="tvl-child-border"></div>
        <div>VAULTS:{vaultsAmount}</div>
      </div> */}
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
