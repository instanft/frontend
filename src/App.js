import './App.css';
import cameraPhoto from './assets/camera-unsplash.jpg';

function App() {
  return (
    <div className="app">
          <div className="landing-img">

              {/* {https://unsplash.com/photos/o2DVsV2PnHE} */}
              <img src={cameraPhoto} alt='Woman holding a camera surrounded by flowers' />
          </div>

          <div>
            <nav>
              <ul>
                <li><a href='/'>About</a></li>
                <li><a href='/'>Login</a></li>
                <li><a href='/'>Connect Wallet</a></li>
              </ul>
            </nav>

            <div className="landing-content">
              <h1>InstaNFT</h1>

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
  );
}

export default App;
