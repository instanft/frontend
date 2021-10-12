import { ethers } from 'ethers';

const mintAbi = require('../abi/WeMint.abi.json').abi;

export const mintInstagramPost = async (metadata) => {
    try {
        console.log('minting NFT...');
        if (!window.ethereum.selectedAddress) {
            await window.ethereum.enable()
          };
    
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
    
          const contract = new ethers.Contract(
            '0x4DC219BBEc605b59aCA22275094fb46B6937194D',   //RINKEBY
            mintAbi,
            signer,
          );

          const mintTx = await contract.safemint(
            metadata.ipfs,
            metadata.username,
            metadata.caption
          )
          console.log(mintTx);
          return mintTx;
    } catch (err) {
        console.log(err);
    }
    return;
}