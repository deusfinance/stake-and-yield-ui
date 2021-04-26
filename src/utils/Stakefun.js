import Web3 from 'web3'
import moment from 'moment'

const INFURA_URL =
  'wss://rinkeby.infura.io/ws/v3/4e955a81217a477e88e3793856deb18b'

const web3 = new Web3(
  window.web3 && window.web3.currentProvider
    ? window.web3.currentProvider
    : INFURA_URL
)

const makeContract = (abi, address) => {
  return new web3.eth.Contract(abi, address)
}

const diffHours = (customDate) => {
  const date = moment(customDate)
  let now = moment(new Date())
  return date.diff(now)
}
export { web3, makeContract, diffHours }
