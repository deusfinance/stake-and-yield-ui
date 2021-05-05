const tokens = [
  {
    name: 'DEUS',
    contarct: '',
    chain: 'BSC',
    icon: 'DEUS.svg',
    balance: 0
  },
  {
    name: 'DEA',
    contarct: '',
    chain: 'BSC',
    icon: 'DEA.svg',
    balance: 0
  },
  {
    name: 'BPT',
    contarct: '',
    chain: 'BSC',
    icon: 'BPT.svg',
    balance: 0
  },
  {
    name: 'sDEA',
    contarct: '',
    chain: 'BSC',
    icon: 'sDEA.svg',
    balance: 0
  },
  {
    name: 'sDEUS',
    contarct: '',
    chain: 'BSC',
    icon: 'sDEUS.svg',
    balance: 0
  },
  {
    name: 'DEUS',
    contarct: '',
    chain: 'ETH',
    icon: 'DEUS.svg',
    balance: 0
  },
  {
    name: 'DEA',
    contarct: '',
    chain: 'ETH',
    icon: 'DEA.svg',
    balance: 0
  },
  {
    name: 'BPT',
    contarct: '',
    chain: 'ETH',
    icon: 'BPT.svg',
    balance: 0
  },
  {
    name: 'sDEA',
    contarct: '',
    chain: 'ETH',
    icon: 'sDEA.svg',
    balance: 0
  },
  {
    name: 'sDEUS',
    contarct: '',
    chain: 'ETH',
    icon: 'sDEUS.svg',
    balance: 0
  }
]
const chains = ['ETH', 'BSC']

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
    desc:
      'Either press the button in the bridge interface or click: Change Network'
  },
  {
    name: 'bridge',
    title: '4 – Initiate Bridging',
    desc:
      'Initiate bridging to the new network by pressing the button in the interface.'
  },
  {
    name: 'claim',
    title: '5 – Claim on destination Network',
    desc: 'Claim your bridged token.'
  }
]
export { tokens, chains, instructions }
