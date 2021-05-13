import React from 'react'
import TokenBadge from './TokenBadge'
import useWeb3 from '../../helper/useWeb3'
import { chains, tokens, ETHContract, BSCContract } from './data'
import { makeContract } from '../../utils/Stakefun'
import { BridgeABI } from '../../utils/StakingABI'
import { sendTransaction } from '../../utils/Stakefun'

const ClaimToken = (props) => {
  const { claims, chainId, account, setFech } = props
  const web3 = useWeb3()
  let network = ''
  if (chainId) {
    network = chains.find((item) => item.id === chainId).network
  }
  let showClaims = claims.filter((item) => Number(item.toChain) === network)
  const handleClaim = async (claim) => {
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
    let amount = web3.utils.fromWei(claim.amount, 'ether')
    let chain = chains.find((item) => item.network === Number(claim.toChain))
    const Contract = makeContract(web3, BridgeABI, bridgeContract)
    sendTransaction(
      Contract,
      `claim`,
      [account, claim.amount, claim.toChain, claim.tokenId, claim.txId],
      account,
      chainId,
      `Claim ${amount} ${chain.name}`
    ).then(() => {
      setFech(claim)
    })
  }
  return (
    <>
      {showClaims.length > 0 && (
        <div className="claim-token">
          <div className="claim-token-title">CLAIM TOKENS</div>
          {showClaims.map((claim, index) => {
            let amount = web3.utils.fromWei(claim.amount, 'ether')
            let token = tokens.find((item) => item.tokenId === claim.tokenId)
            let chain = chains.find(
              (item) => item.network === Number(claim.toChain)
            )
            return (
              <div className="flex-between mb-5" key={index}>
                <div className="token-item">
                  <TokenBadge chain={chain.name} icon={token.icon} />
                  <span>{`${token.name} (${chain.name})`}</span>
                </div>
                <div className="claim-amount">{amount}</div>
                <div className="container-claim-btn">
                  <div className="claim-btn">Change Network</div>
                  <div className="claim-btn" onClick={() => handleClaim(claim)}>
                    CLAIM
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default ClaimToken
