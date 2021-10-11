import React, { useState } from 'react';
import cameraPhoto from './assets/camera-unsplash.jpg';
import {Link} from 'react-router-dom';
import MintSuccessModal from './components/MintSuccessModal';
import detectEthereumProvider from '@metamask/detect-provider';
// import Web3 from 'web3';

const Landing = () => {
  let provider = {};
  const [successfulMint, setSuccessfulMint] = useState(false);

    const initMetamask = async (e) => {
      e.preventDefault();
      provider = await detectEthereumProvider();

      if (provider) {
        try {
          // console.log('woo!', provider, provider.isMetaMask, provider.selectedAddress);
          const accounts = await provider.request({method: "eth_requestAccounts"});
          console.log(accounts);
          alert('You logged in successfully.');
        } catch (err) {
          alert('Please login to your MetaMask account and try again.');
          console.log(err);
        }
      } else {
        alert('Please install MetaMask and try again.');
      }
    }

    function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
        console.log('Welcome!  Fetching your information.... ');
        window.FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name);
          console.log('Thanks for logging in, ' + response.name + '!');
        });
      }

    function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
        console.log('statusChangeCallback');
        console.log(response);                   // The current login status of the person.
        if (response.status === 'connected') {   // Logged into your webpage and Facebook.
          testAPI();  
        } else {                                 // Not logged into your webpage or we are unable to tell.
          console.log('Please log ' +
            'into this webpage.');
        }
      }

    const checkLoginState = () => {               // Called when a person is finished with the Login Button.
        window.FB.getLoginStatus(function(response) {   // See the onlogin handler
          statusChangeCallback(response);
          console.log(response);
        });
      }

    return (
        <div className="app">
          <h1>WeMint</h1>
          <div className="landing-img">
              <img src={cameraPhoto} alt='Woman holding a camera surrounded by flowers' />
          </div>

          <div className="landing-content-parent">
              <button className="test-button" onClick={() => checkLoginState()}>Logged In?</button>   {/* For testing only */}
            <nav>
              <ul>
                  <Link to="/">Home</Link>
                  <Link to="/about">About</Link>
                  <Link to="/mint">Mint</Link>
                  <a className="metamask-connect" href="/"
                  onClick={(event) => initMetamask(event)}
                  >Connect Wallet</a>
                  <div className="fb-login-button" data-width="" data-size="medium" data-button-type="login_with" data-layout="default" data-auto-logout-link="true" data-use-continue-as="true"></div>
              </ul>
            </nav>

            <div className="landing-content">
              {successfulMint ? <MintSuccessModal setSuccessfulMint={setSuccessfulMint}/> : null}
              <h2>Own your posts.</h2> 
              <br></br>
              
              <p>WeMint lets you mint NFTs from your social media accounts so you can own & monetize your entire digital life.</p>

              <br></br><br></br><br></br>

              <form>
                <input placeholder="Copy/paste your Instagram post URL..."></input>
                <button type="submit">Mint</button>
                </form>
              
              <div>
                  <p>Simply login to your Instagram account, copy & paste a link to any of your posts, and click "Mint" to take back what's yours.</p>
              </div>
            </div>
      </div>
    </div>
    )
}

export default Landing;