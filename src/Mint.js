import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

class Mint extends Component {
  state = {
    instagram: '#',
    code: '',
    redirect_uri:
      'https://f29e-200-7-246-43.ngrok.io/mint'
  };

  componentDidMount = async () => {
    let server = this.state.redirect_uri;
    let instagram =
      'https://api.instagram.com/oauth/authorize?client_id=455896699087409' +
      '&scope=user_profile,user_media&response_type=code' +
      '&redirect_uri=' +
      server;
    this.setState({ instagram: instagram, redirect_uri: server });
    await this.instagramCode();
    this.instagramToken();
  };

  instagramCode = async () => {
    if (this.props.location && this.props.location.search) {
      let code = this.props.location.search.replace('?code=', '');
      //console.log(code);
      this.setState({ code: code });
    }
  };

  instagramToken = async () => {
    const code = this.state.code;
    const uri = this.state.redirect_uri;
    console.log(code);
    console.log(uri);
    if (code && uri) {
      const data = new FormData();
      data.append('client_id', '455896699087409');
      data.append('client_secret', '3c1b839b2a776de7a3bafe64eb98dc6a');
      data.append('grant_type', 'authorization_code');
      data.append('redirect_uri', uri);
      data.append('code', code);

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
      };
      const response = await fetch(
        'https://api.instagram.com/oauth/access_token',
        requestOptions
      );
      const json = await response.json();
      console.log(json);
      //this.setState({ postId: data.id });
    }
  };

  render() {
    return (
      <div>
        <a href={this.state.instagram}>Instagram</a>
        <p>
          {this.state.code}
        </p>
      </div>
    );
  }
}

export default Mint;
