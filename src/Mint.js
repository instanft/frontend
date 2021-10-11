import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

class Mint extends Component {
  state = {
    instagram_code: '#',
    code: '',
    instagram: [],
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
    const html = images.map(item => `<img src=${item.media_url} alt=${item.caption} />`).join('<br/>');
    return html;
  };

  callFunction = async () => {
    const code = this.state.code;
    console.log(this.state.code);
    await this.getImagesInstagram(code);
  };

  callFunctionImages = async () => {
    console.log(this.images);
  };

  renderImages = async () => {
    let images = this.state.instagram;

    return (
      <div className="gallery-view">
        {images.map((value, index) => {
          return <img key={index} src={value.media_url} alt={value.caption} style={{width: '400px', height: '400px'}}/>;
        })}
      </div>
    );
  };

  render() {
    console.log(this.state.instagram);
    return (
      <div>
        <a href={this.state.instagram_code}>Instagram</a>
        <p>
          {this.state.code}
        </p>
        <button onClick={this.callFunction}> Get Images </button>
        <button onClick={this.callFunctionImages}> Images Console? </button>
        <div id="images" />
      </div>
    );
  }
}

export default Mint;
