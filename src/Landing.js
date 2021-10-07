import React from 'react';
import cameraPhoto from './assets/camera-unsplash.jpg';
import {Link} from 'react-router-dom';

const Landing = () => {
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
          <div className="landing-img">

              {/* {https://unsplash.com/photos/o2DVsV2PnHE} */}
              <img src={cameraPhoto} alt='Woman holding a camera surrounded by flowers' />
          </div>

          <div>
            <nav>
              <ul>
                  <Link to="/">Home</Link>
                  <Link to="/about">About</Link>
                  <div className="fb-login-button" data-width="" data-size="medium" data-button-type="login_with" data-layout="default" data-auto-logout-link="true" data-use-continue-as="true"></div>
                  <Link to="/connect">Connect</Link>
              </ul>
            </nav>

            <div className="landing-content">
              <h1>WeMint</h1>
              <button onClick={() => checkLoginState()}>Logged In?</button>

              <br></br><br></br><br></br>

              <form>
                <input placeholder="Copy/paste your Instagram post URL..."></input>
                <button type="submit">Mint</button>
                </form>
              
              <div>
                  <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>

                  <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
              </div>
            </div>
      </div>
    </div>
    )
}

export default Landing;