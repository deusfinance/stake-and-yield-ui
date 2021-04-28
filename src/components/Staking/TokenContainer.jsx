import React from 'react'
import Collapsible from 'react-collapsible'
import moment from 'moment'
import CollapseTrigger from './CollapseTrigger'
import CollapseTriggerOpen from './CollapseTriggerOpen'
import {
  web3,
  makeContract,
  sendTransaction,
  diffHours
} from '../../utils/Stakefun'
import { abi, StakeAndYieldABI } from '../../utils/ABIERC20'
import './style.css'
import UserInfo from './UserInfo'
import Frozen from './Frozen'
import Fluid from './Fluid'
import Deposite from './Deposite'
import Mint from './Mint'

const TokenContainer = (props) => {
  const {
    open,
    title,
    titleExit,
    onlyLocking,
    stakingContract,
    vaultContract,
    exitable,
    yieldable,
    owner,
    chainId,
    category,
    balancer,
    handleTriggerClick
  } = props
  const [collapseContent, setCollapseContent] = React.useState('deposite')
  const [unfreezStake, setUnfreezStake] = React.useState('0')
  const [showFluid, setShowFluid] = React.useState(false)
  const [userInfo, setUserInfo] = React.useState({
    stakedTokenAddress: '',
    StakedTokenContract: '',
    StakeAndYieldContract: '',
    balanceWallet: 0,
    balance: 0,
    apy: 0,
    own: 0,
    claim: '',
    exit: '',
    stakeType: '0',
    stakeTypeName: '',
    approve: 0,
    withDrawable: 0,
    withDrawableExit: 0,
    lockStakeType: false,
    burn: '',
    fullyUnlock: '',
    withDrawTime: ''
  })
  React.useMemo(() => {
    setShowFluid(false)
    setUserInfo({
      stakedTokenAddress: '',
      StakedTokenContract: '',
      StakeAndYieldContract: '',
      balanceWallet: 0,
      balance: 0,
      apy: 0,
      own: 0,
      claim: '',
      exit: '',
      stakeType: '0',
      stakeTypeName: '',
      approve: 0,
      withDrawable: 0,
      withDrawableExit: 0,
      lockStakeType: false,
      burn: '',
      fullyUnlock: '',
      withDrawTime: ''
    })
  }, [owner, chainId])

  const StakeAndYieldContract = makeContract(StakeAndYieldABI, stakingContract)

  React.useEffect(() => {
    if (owner) {
      fetchDataUser()
    }

    let subscription = web3.eth.subscribe(
      'newBlockHeaders',
      (error, result) => {
        if (!error && owner) {
          fetchDataUser()
          return
        }

        console.error(error)
      }
    )
    return () => {
      // unsubscribes the subscription
      subscription.unsubscribe(function (error, success) {
        if (success) {
          console.log('Successfully unsubscribed!')
        }
      })
    }
  }, [owner, chainId])

  React.useEffect(() => {
    if (userInfo.stakeType === '0' || userInfo.balance == '0') {
      setCollapseContent('deposite')
    } else {
      setCollapseContent('default')
    }
  }, [owner, chainId, userInfo.balance])

  const fetchDataUser = async () => {
    try {
      let result = await StakeAndYieldContract.methods.userInfo(owner).call()
      console.log({ result })
      let { numbers, exit, stakedTokenAddress } = result
      const StakedTokenContract = makeContract(abi, stakedTokenAddress)
      let balanceWallet = await StakedTokenContract.methods
        .balanceOf(owner)
        .call()
      balanceWallet = web3.utils.fromWei(balanceWallet, 'ether')
      let approve = await StakedTokenContract.methods
        .allowance(owner, stakingContract)
        .call()
      approve = Number(web3.utils.fromWei(approve, 'ether'))

      let apy = (
        (Number(web3.utils.fromWei(numbers[7], 'ether')) +
          Number(web3.utils.fromWei(numbers[8], 'ether'))) *
        100
      ).toFixed(2)

      let claim = web3.utils.fromWei(numbers[9], 'ether')
      let balance = web3.utils.fromWei(numbers[0], 'ether')
      let stakeType = numbers[1]
      let totalSupply = Number(web3.utils.fromWei(numbers[4], 'ether'))
      let totalSupplyYield = Number(web3.utils.fromWei(numbers[5], 'ether'))
      let withDrawable = Number(web3.utils.fromWei(numbers[3], 'ether'))
      let withDrawableExit = Number(web3.utils.fromWei(numbers[13], 'ether'))
      let fullyUnlock = Number(numbers[10]) + 90 * 24 * 3600
      fullyUnlock = moment(new Date(fullyUnlock * 1000)).format('DD.MM.YYYY')
      let burn = balance / 90
      let withDrawTime = Number(numbers[2]) + 24 * 3600
      withDrawTime = new Date(withDrawTime * 1000)
      let showFluid = moment(withDrawTime).diff(moment(new Date()))
      // TODO check after transaction contract become ok
      if (showFluid <= 0 && (withDrawable > 0 || withDrawableExit > 0)) {
        setShowFluid(true)
      }
      let total = 0
      let stakeTypeName = ''
      switch (stakeType) {
        case '1':
          total = totalSupply
          stakeTypeName = 'Stake'
          break
        case '2':
          total = totalSupplyYield
          stakeTypeName = 'Yield'
          break
        case '3':
          total = totalSupplyYield + totalSupply
          stakeTypeName = 'Stake & Yield'
          break
        default:
          break
      }

      if (Number(balance) > 0) {
        setUserInfo((prev) => {
          return {
            ...prev,
            lockStakeType: true
          }
        })
      } else {
        {
          setUserInfo((prev) => {
            return {
              ...prev,
              lockStakeType: false
            }
          })
        }
      }
      setUserInfo((prev) => {
        return {
          ...prev,
          stakedTokenAddress,
          StakedTokenContract,
          StakeAndYieldContract,
          approve,
          stakeType,
          stakeTypeName,
          balanceWallet,
          balance,
          apy,
          claim,
          exit,
          withDrawable,
          withDrawableExit,
          burn,
          fullyUnlock,
          withDrawTime
        }
      })
      if (total > 0) {
        const own = ((Number(balance) / total) * 100).toFixed(2)
        setUserInfo((prev) => {
          return { ...prev, own }
        })
      }
    } catch (error) {
      console.log('error Happend in Fetch data', error)
    }
  }

  const handleCollapseContent = (data) => {
    setCollapseContent(data)
  }

  const handleBack = () => {
    setCollapseContent('default')
  }
  const handleUnfreezStake = () => {
    if (unfreezStake == 0 || unfreezStake == '') return

    let amount = web3.utils.toWei(unfreezStake)
    sendTransaction(
      StakeAndYieldContract,
      `unfreeze`,
      [amount],
      owner,
      chainId,
      `Withdraw`
    ).then(() => {
      setUnfreezStake(0)
    })
  }

  return (
    <div className="token-container">
      <Collapsible
        handleTriggerClick={() => handleTriggerClick(title)}
        open={open[title]}
        trigger={
          <CollapseTrigger
            title={title}
            onlyLocking={onlyLocking}
            apy={userInfo.apy}
            category={category}
            balancer={balancer}
            balanceWallet={userInfo.balanceWallet}
            handleCollapseContent={(data) => handleCollapseContent(data)}
          />
        }
        triggerWhenOpen={
          <CollapseTriggerOpen
            title={title}
            onlyLocking={onlyLocking}
            apy={userInfo.apy}
            category={category}
            balancer={balancer}
            balanceWallet={userInfo.balanceWallet}
            handleCollapseContent={(data) => handleCollapseContent(data)}
          />
        }
      >
        <div className="collapse-border"></div>
        {collapseContent === 'default' && (
          <>
            <UserInfo
              {...userInfo}
              title={title}
              owner={owner}
              chainId={chainId}
              exitable={exitable}
            />
            {userInfo.stakeType !== '1' ? (
              <>
                <Frozen
                  {...userInfo}
                  owner={owner}
                  title={title}
                  titleExit={titleExit}
                  chainId={chainId}
                  showFluid={() => setShowFluid(true)}
                />
                {showFluid && (
                  <Fluid
                    {...userInfo}
                    chainId={chainId}
                    owner={owner}
                    title={title}
                    titleExit={titleExit}
                    showFluid={() => setShowFluid(false)}
                  />
                )}
              </>
            ) : (
              <div className="wrap-box mt-20">
                <div className="wrap-box-gray width-202">
                  <input
                    type="text"
                    className="input-transparent"
                    value={unfreezStake}
                    onChange={(e) => setUnfreezStake(e.target.value)}
                  />
                  <div
                    onClick={() => setUnfreezStake(userInfo.balance)}
                    className="opacity-75"
                  >
                    Max
                  </div>
                </div>

                <div
                  className="wrap-box-gradient width-402"
                  onClick={handleUnfreezStake}
                >
                  Withdraw + Claim
                </div>
              </div>
            )}
            {/* <DepositBtn onClickDeposite={data =>handleCollapseContent(data)} /> */}
          </>
        )}
        {collapseContent === 'deposite' && (
          <Deposite
            {...userInfo}
            stakingContract={stakingContract}
            owner={owner}
            chainId={chainId}
            title={title}
            handleBack={handleBack}
            exitable={exitable}
            yieldable={yieldable}
          />
        )}
        {collapseContent === 'get' && (
          <Mint
            {...userInfo}
            vaultContract={vaultContract}
            owner={owner}
            chainId={chainId}
            title={title}
            handleBack={handleBack}
          />
        )}
      </Collapsible>
    </div>
  )
}

export default TokenContainer
