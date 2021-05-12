// const tokens = [
//   {
//     name: 'ERT',
//     address: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
//     chain: 'BSC',
//     icon: 'DEUS.svg',
//     balance: 0,
//     chainId: 97
//   },
//   {
//     name: 'DEUS',
//     address: '',
//     chain: 'BSC',
//     icon: 'DEUS.svg',
//     balance: 0,
//     chainId: 97
//   },
//   {
//     name: 'DEA',
//     address: '',
//     chain: 'BSC',
//     icon: 'DEA.svg',
//     balance: 0
//   },
//   {
//     name: 'BPT',
//     address: '',
//     chain: 'BSC',
//     icon: 'BPT.svg',
//     balance: 0,
//     chainId: 97
//   },
//   {
//     name: 'sDEA',
//     address: '',
//     chain: 'BSC',
//     icon: 'sDEA.svg',
//     balance: 0,
//     chainId: 97
//   },
//   {
//     name: 'sDEUS',
//     address: '',
//     chain: 'BSC',
//     icon: 'sDEUS.svg',
//     balance: 0,
//     chainId: 97
//   },
//   {
//     name: 'ERT',
//     address: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
//     chain: 'ETH',
//     icon: 'DEUS.svg',
//     balance: 0,
//     chainId: 4
//   },
//   {
//     name: '',
//     address: '',
//     chain: 'ETH',
//     icon: 'DEUS.svg',
//     balance: 0,
//     chainId: 4
//   },
//   {
//     name: 'DEA',
//     address: '0x02b7a1AF1e9c7364Dd92CdC3b09340Aea6403934',
//     chain: 'ETH',
//     icon: 'DEA.svg',
//     balance: 0,
//     chainId: 4
//   },
//   {
//     name: 'BPT',
//     address: '',
//     chain: 'ETH',
//     icon: 'BPT.svg',
//     balance: 0,
//     chainId: 4
//   },
//   {
//     name: 'sDEA',
//     address: '',
//     chain: 'ETH',
//     icon: 'sDEA.svg',
//     balance: 0,
//     chainId: 4
//   },
//   {
//     name: 'sDEUS',
//     address: '',
//     chain: 'ETH',
//     icon: 'sDEUS.svg',
//     balance: 0,
//     chainId: 4
//   }
// ]

const BSCContract = '0x70EF3ae9Db80462caFd048748d5Fc905fc471Ae4'
const ETHContract = '0xFe9Cece1D202199Bf85427C7BEBE2Be8A870124F'

const tokens = [
  {
    name: 'DEUS',
    tokenId: 1,
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6'
    },
    icon: 'DEUS.svg'
  },
  {
    name: 'DEA',
    tokenId: 2,
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6'
    },
    icon: 'DEA.svg'
  },
  {
    name: 'BPT',
    tokenId: 3,
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6'
    },
    icon: 'BPT.svg'
  },
  {
    name: 'sDEA',
    tokenId: 4,
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6'
    },
    icon: 'sDEA.svg'
  },
  {
    name: 'sDEUS',
    tokenId: 5,
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6'
    },
    icon: 'sDEUS.svg'
  }
]

const chains = [
  { id: 97, name: 'BSC', network: 2 },
  { id: 4, name: 'ETH', network: 1 }
]

const instructions = [
  {
    name: 'approve',
    title: '1 – Approve Spend',
    desc: 'Approve the spend of the asset that you intend to bridge.'
  },
  {
    name: 'deposit',
    title: '2 – Deposit',
    desc: 'Your asset will be deposited to the bridge before you can withdraw '
  },
  {
    name: 'network',
    title: '3 – Change Network',
    desc: 'Either press the button in the bridge interface or click: Change Network'
  },
  {
    name: 'bridge',
    title: '4 – Initiate Bridging',
    desc: 'Initiate bridging to the new network by pressing the button in the interface.'
  },
  {
    name: 'claim',
    title: '5 – Claim on destination Network',
    desc: 'Claim your bridged token.'
  }
]

export { ETHContract, BSCContract, tokens, chains, instructions }
