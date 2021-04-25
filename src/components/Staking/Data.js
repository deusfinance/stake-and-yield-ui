const tokens = [
  {
    title: 'sDEA',
    titleExit: 'DEA',
    stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
    vaultContract: '0x6ba4ead0115f3c9239d596fe4bb7c242a39f62f0',
    exitable: true,
    category: 'single',
    yieldable: true
  },
  {
    title: 'sDEUS',
    titleExit: 'DEUS',
    stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
    vaultContract: '0x09cb978bb7e6fb5583fc9107f92214451f6296a5',
    exitable: true,
    category: 'single',
    yieldable: true
  },
  {
    title: 'TIME',
    titleExit: '',
    stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
    vaultContract: '0x6ba4ead0115f3c9239d596fe4bb7c242a39f62f0',

    exitable: false,
    category: '',
    yieldable: false
  },
  {
    title: 'BPT',
    titleExit: '',
    stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
    vaultContract: '0x6ba4ead0115f3c9239d596fe4bb7c242a39f62f0',

    exitable: false,
    category: 'liquidity',
    yieldable: true
  },
  {
    title: 'sUNI-DD',
    stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
    vaultContract: '0x6ba4ead0115f3c9239d596fe4bb7c242a39f62f0',

    category: 'liquidity',
    onlyLocking: true
  },
  {
    title: 'sUNI-DU',
    stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
    vaultContract: '0x6ba4ead0115f3c9239d596fe4bb7c242a39f62f0',

    category: 'liquidity',
    onlyLocking: true
  },
  {
    title: 'sUNI-DE',
    stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
    vaultContract: '0x6ba4ead0115f3c9239d596fe4bb7c242a39f62f0',

    category: 'liquidity',
    onlyLocking: true
  }
]
export default tokens
