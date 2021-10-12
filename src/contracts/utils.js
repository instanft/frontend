import { ethers } from 'ethers';

const mintAbi = require('../abi/WeMint.abi.json').abi;

export const mintInstagramPost = async (metadata) => {
    try {
        console.log('minting NFT...');
        if (!window.ethereum.selectedAddress) {
            await window.ethereum.enable()
          };
    
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          console.log(provider);
          const signer = provider.getSigner();
          console.log(signer);
    
          const contract = new ethers.Contract(
            '0x9329DC8c9cA96B6eAB0714fcC64f31B610f281Ad',   //RINKEBY
            mintAbi,
            signer,
          );
          console.log(contract);
          console.log(metadata.ipfs, typeof metadata.ipfs, metadata.username, typeof metadata.username, metadata.caption, typeof metadata.caption)
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