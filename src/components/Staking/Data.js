const tokens = {
  1: [
    {
      title: 'sDEA',
      titleExit: 'DEA',
      stakingContract: '0xC2306fB9b3102D82810Fbef8A419020573Bc1D44',
      vaultContract: '0x1591Da306e9726CF8a60BfF1CE96d7714D7b24cd',
      exitable: true,
      category: 'single',
      yieldable: true,
      link: '/swap'
    },
    // {
    //   title: 'sDEUS',
    //   titleExit: 'DEUS',
    //   stakingContract: '0xC2306fB9b3102D82810Fbef8A419020573Bc1D44',
    //   vaultContract: '0xF8bcAF889F60E3d277EA0139e75047a0301D3307',
    //   exitable: true,
    //   category: 'single',
    //   yieldable: true,
    //  link:'/swap'
    // },
    // {
    //   title: 'TIME',
    //   titleExit: 'TIME',
    //   stakingContract: '0xC2306fB9b3102D82810Fbef8A419020573Bc1D44',
    //   vaultContract: '0x23459b0026Ed1cAE0b6da5E9364aCec07469Ffcd',

    //   exitable: false,
    //   category: '',
    //   yieldable: false
    // },
    // {
    //   title: 'BPT',
    //   titleExit: 'BPT',
    //   stakingContract: '0xC2306fB9b3102D82810Fbef8A419020573Bc1D44',
    //   balancer: true,
    //   exitable: false,
    //   category: 'liquidity',
    //   yieldable: true,
    // link:
    // 'https://pools.balancer.exchange/#/pool/0x1dc2948b6db34e38291090b825518c1e8346938b/'
    // },
    {
      title: 'sUNI-DD',
      titleExit: 'UNI-DD',
      stakingContract: '0xC2306fB9b3102D82810Fbef8A419020573Bc1D44',
      vaultContract: '0xEC7269Ebb7D219C905c28E3fD5Cc35F30dfB870b',
      category: 'liquidity',
      onlyLocking: true,
      link:
        'https://app.uniswap.org/#/add/0x3b62F3820e0B035cc4aD602dECe6d796BC325325/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778'
    },
    {
      title: 'sUNI-DU',
      titleExit: 'UNI-DU',
      stakingContract: '0xC2306fB9b3102D82810Fbef8A419020573Bc1D44',
      vaultContract: '0x4D01703442509233eFa9879E638278a59b4A5EBB',
      category: 'liquidity',
      onlyLocking: true,
      link:
        'https://app.uniswap.org/#/add/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778'
    },
    {
      title: 'sUNI-DE',
      titleExit: 'UNI-DE',
      stakingContract: '0xC2306fB9b3102D82810Fbef8A419020573Bc1D44',
      vaultContract: '0xc8c91801Bed699598b5483F2ad55f89eBd35157F',
      category: 'liquidity',
      onlyLocking: true,
      link:
        'https://app.uniswap.org/#/add/0x3b62f3820e0b035cc4ad602dece6d796bc325325/ETH'
    }
  ],
  4: [
    {
      title: 'sDEA',
      titleExit: 'DEA',
      stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
      vaultContract: '0xbA5d9F66f7545fa57c15da4002A33792A7E41F46',
      exitable: true,
      category: 'single',
      yieldable: true,
      link: '/swap'
    },
    {
      title: 'sDEUS',
      titleExit: 'DEUS',
      stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
      vaultContract: '0xbA5d9F66f7545fa57c15da4002A33792A7E41F46',
      exitable: true,
      category: 'single',
      yieldable: true,
      link: '/swap'
    },
    {
      title: 'TIME',
      titleExit: 'TIME',
      stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
      vaultContract: '0xbA5d9F66f7545fa57c15da4002A33792A7E41F46',
      exitable: false,
      category: '',
      yieldable: false
    },
    {
      title: 'BPT',
      titleExit: 'BPT',
      stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
      balancer: true,
      exitable: false,
      category: 'liquidity',
      yieldable: true,
      link:
        'https://pools.balancer.exchange/#/pool/0x1dc2948b6db34e38291090b825518c1e8346938b/'
    },
    {
      title: 'sUNI-DD',
      titleExit: 'UNI-DD',
      stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
      vaultContract: '0xbA5d9F66f7545fa57c15da4002A33792A7E41F46',

      category: 'liquidity',
      onlyLocking: true,
      link:
        'https://app.uniswap.org/#/add/0x3b62F3820e0B035cc4aD602dECe6d796BC325325/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778'
    },
    {
      title: 'sUNI-DU',
      titleExit: 'UNI-DU',

      stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
      vaultContract: '0xbA5d9F66f7545fa57c15da4002A33792A7E41F46',
      category: 'liquidity',
      onlyLocking: true,
      link:
        'https://app.uniswap.org/#/add/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778'
    },
    {
      title: 'sUNI-DE',
      titleExit: 'UNI-DE',
      stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
      vaultContract: '0xbA5d9F66f7545fa57c15da4002A33792A7E41F46',
      category: 'liquidity',
      onlyLocking: true,
      link:
        'https://app.uniswap.org/#/add/0x3b62f3820e0b035cc4ad602dece6d796bc325325/ETH'
    }
  ]
}

export default tokens
