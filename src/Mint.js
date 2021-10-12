import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//var request = require('request');

class Mint extends Component {
  state = {
    instagram_code: '#',
    code: '',
    instagram: [],
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

  callFunctionImages = async () => {
    this.images = [
      {
        media_url:
          'https://scontent-iad3-2.cdninstagram.com/v/t51.2885-15/1171992_220185431486696_1417365155_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=tssZuO0j088AX--a6mc&_nc_ht=scontent-iad3-2.cdninstagram.com&edm=ANQ71j8EAAAA&oh=fc9dbc9c233894897eb37883e4c04580&oe=616A3275',
        caption: 'This image is a bike',
        username: 'christmo',
        id: '123'
      }
    ];

    const component = this;
    let image = this.images[0];
    let url = image.media_url;
    let caption = image.caption;
    let name = image.username + '-' + image.id;
    console.log(image);

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

  render() {
    return (
      <div>
        <a href={this.state.instagram_code}>Instagram</a>
        <p>
          {this.state.code}
        </p>
        <button onClick={this.callFunction}> Get Images </button>
        <button onClick={this.callFunctionImages}> Send 1 to IPFS </button>
        <div id="images" className="gallery-view" />
      </div>
    );
  }
}

export default Mint;
