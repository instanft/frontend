// import MetaMaskOnboarding from '@metamask/onboarding'

// const initialize = () => {
//   console.log('init...');
//   //Basis Actions Sections
//   const onboardButton = document.getElementById('connectButton'); 
//   const getAccountsButton = document.getElementById('getAccounts');
//   const getAccountsResult = document.getElementById('getAccountsResult');

//   const isMetaMaskInstalled = () => {
//     console.log('checking...');
//     //Have to check the etherum binding on the window object to see if it's installed
//     const { etherum } = window;
//     return Boolean(etherum && etherum.isMetaMask);
//   };
//   isMetaMaskInstalled();
// };

//   //We create a new MEtaMask onboarding objsec to use in our app
//   const onboarding = new MetaMaskOnboarding({ forwarderOrigin});

//   const onClickInstall = () => {
//     onboardButton.innerText = 'Onboarding in progress';
//     onboardButton.disabled = true;
//     //On this object we have startOnboarding which will start the onboarding process for our end user
//     onboarding.startOnboarding();
//   }

//   const onClickConnect = async () => {
//     try{
//       // Will open the MetMask UI
//       // You should disable this button while the request is pending!
//       await etherum.request({ method: 'eth_requestAccounts'});
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const MetaMaskClientCheck = () => {
//     //Now we check to see if MetaMask is installed 
//     if (!isMetaMaskInstalled()){
//       //If not installed then we ask user to click to install it
//       onboardButton.innerText = 'Click here to install Meta Mask';
//       //When the button is clicked we call this function
//       onboardButton.onclick = onClickInstall;
//       //the button is now disabled
//       onboardButton.disabled = false;
//     } else {
//       //If it is installed we charge our button text to connect 
//       onboardButton.innerText = 'Click here to connect';
//       //When the button is clicked we call this function 
//       onboardButton.onclick = onClickConnect;
//       //the button is now disabled
//       onboardButton.disabled = false;
//     }
//   };

//   //Eth_accounts-getAccountsButton
//   getAccountsButton.addEventListener('click', async () => {
//     //we use eth_accounts beacuse it returns a list of addresses owned by us.
//     const accounts = await etherum.request({ method: 'eth_accounts'});
//     //We take the first address in the array of adresses
//     getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
//   });  


// MetaMaskClientCheck();
// window.addEventListener('DOMContentLoaded', initialize);
