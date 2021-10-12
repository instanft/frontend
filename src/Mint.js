import React, { Component } from 'react';
import { mintInstagramPost } from './contracts/utils';
//import { Link } from 'react-router-dom';
//var request = require('request');

class Mint extends Component {
  state = {
    instagram_code: '#',
    code: '',
    instagram: [],
    images: [],
    metadata: {},
    redirect_uri: 'https://vigorous-bartik-1b0e50.netlify.app/mint'
  };

  componentDidMount = async () => {
    let server = this.state.redirect_uri;
    let instagram_code =
      //'https://api.instagram.com/oauth/authorize?client_id=455896699087409' +
      'https://api.instagram.com/oauth/authorize?client_id=1190054788155032' +
      '&scope=user_profile,user_media&response_type=code' +
      '&redirect_uri=' +
      server;
    this.setState({ instagram_code: instagram_code, redirect_uri: server });
    await this.instagramCode();
  };

  instagramCode = async () => {
    if (this.props.location && this.props.location.search) {
      let code = this.props.location.search.replace('?code=', '');
      this.setState({ code: code });
      //await this.getImagesInstagram(code);
    }
  };

  getImagesInstagram = async code => {
    var component = this;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch('/.netlify/functions/instagram-fetch?code=' + code, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        component.images = data;
        this.state.images = data;
        const div = document.getElementById('images');
        div.innerHTML = this.listOfImages(data);
      });
  };

  listOfImages = images => {
    const html = images.map(
      item =>
        `<img src=${item.media_url} alt=${item.caption} height="400" width="400" />`
    );
    return html;
  };

  callFunction = async () => {
    const code = this.state.code;
    console.log(this.state.code);
    await this.getImagesInstagram(code);
  };

  pushImageToIPFS = async () => {
    const component = this;
    console.log('double check: ', this.state.images);
    const randNum = Math.floor(Math.random() * 24);
    let image = this.state.images[randNum];
    /*const image = [
      {
        media_url:
          this.state.images[randNum].media_url,
        caption: this.state.images[randNum].caption,
        username: this.state.images[randNum].username,
        id: this.state.images[randNum].id
      }
    ];*/

    console.log('img: ', image);
    let url = image.media_url;
    let caption = image.caption;
    let name = image.username + '-' + image.id;

    fetch(url)
      .then(res => res.blob()) // Gets the response and returns it as a blob
      .then(blob => {
        let objectURL = URL.createObjectURL(blob);
        let myImage = new Image();
        myImage.src = objectURL;
        document.getElementById('images').appendChild(myImage);
        document.blob = blob;
        component.saveNFT(name, caption, blob);
      });
  };

  saveNFT = async (name, description, blob) => {
    const formData = new FormData();
    formData.append(
      'file',
      new File([blob], name + '.jpg', { type: 'image/jpeg' }),
      name
    );
    const requestOptions = {
      method: 'POST',
      headers: {
        pinata_api_key: 'a6ac6301b2f21db1b27d',
        pinata_secret_api_key:
          'dc48cb7b9eaab52c645c63611709d0d97f3a446b532a43158df10d3919b216bd'
      },
      body: formData,
      redirect: 'follow'
    };

    fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', requestOptions)
      .then(response => response.json())
      .then(data => {
        let metadata = {
          ipfs: 'https://ipfs.io/ipfs/' + data.IpfsHash,
          gateway: 'https://gateway.pinata.cloud/ipfs/' + data.IpfsHash,
          caption: description,
          ...data
        };
        console.log(metadata);
        this.setState({ metadata: metadata });
      })
      .catch(error => {
        console.log('error: ' + error);
      });
  };

   mint = async (event) => {
     console.log('mint was called');
     event.preventDefault();
    let res = await mintInstagramPost(this.state.metadata);
    console.log(res);
  }

  render() {
    return (
      <div>
        <a href={this.state.instagram_code}>Instagram</a>
        <p>
          {this.state.code}
        </p>
        <button onClick={this.callFunction}> Get Images </button>
        <button
        // onClick={this.callFunctionImages}
        > Send 1 to IPFS </button>
        <div id="images" className="gallery-view" onClick={this.pushImageToIPFS} />
        <p>{this.state.metadata !== {} ? this.state.metadata.ipfs : null}</p>
            <form>
                <input placeholder="Copy/paste your Instagram post URL..."></input>
                <button type="submit" onSubmit={(e) => this.mint(e)}>Mint</button>
            </form>
      </div>
    );
  }
}

export default Mint;
