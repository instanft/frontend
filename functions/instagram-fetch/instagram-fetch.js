// for a full working demo of Netlify Identity + Functions, see https://netlify-gotrue-in-react.netlify.com/

//const fetch = require('node-fetch');
//import { FormData } from 'formdata-node';
const request = require('request');

const handler = async function(event, context) {
  let items = [];
  const code = event.queryStringParameters.code;
  console.log('code:' + code);
  if (code) {
    try {
      let token_data = await getToken(code);
      console.log('token:' + token_data);
      let token = token_data.access_token;
      if (token) {
        let media_list = await mediaIds(token);
        console.log(media_list);
        items = await getItems(media_list.data, token);
        console.log(items);
      }

      return {
        statusCode: 200,
        body: JSON.stringify(items)
      };
    } catch (error) {
      // output to netlify function log
      console.log(error);
      return {
        statusCode: 500,
        // Could be a custom message or object i.e. JSON.stringify(err)
        body: JSON.stringify({ msg: error.message })
      };
    }
  } else {
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: "You've not sent Intagram Code" })
    };
  }
};

getItems = async (data, token) => {
  let items = [];
  if (data) {
    let photos = data;
    for (const photo in photos) {
      const mediaId = photos[photo].id;
      const caption = photos[photo].caption;

      let media = {
        uri:
          'https://graph.instagram.com/' +
          mediaId +
          '?fields=id,media_type,media_url,username,timestamp&access_token=' +
          token,
        method: 'GET'
      };
      let item = await new Promise((resolve, reject) => {
        request(media, (error, response, body) => {
          let bodyJson = JSON.parse(body);
          bodyJson.caption = caption;
          resolve(bodyJson);
        });
      });
      items.push(item);
    }
  }
  return items;
};

mediaIds = async token => {
  let media = {
    uri:
      'https://graph.instagram.com/me/media?fields=id,caption&access_token=' +
      token,
    method: 'GET'
  };
  return await new Promise((resolve, reject) => {
    request(media, (error, response, body) => {
      resolve(JSON.parse(body));
    });
  });
};

getToken = async code => {
  let token = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    uri: 'https://api.instagram.com/oauth/access_token',
    method: 'POST',
    form: {
      //client_id: '455896699087409',
      client_id: '359708129173792',
      //client_secret: '3c1b839b2a776de7a3bafe64eb98dc6a',
      client_secret: '6527a8118874d23cab00241be04a43b4',
      grant_type: 'authorization_code',
      redirect_uri: 'https://vigorous-bartik-1b0e50.netlify.app/mint',
      code: code
    }
  };

  return await new Promise((resolve, reject) => {
    request(token, (error, response, body) => {
      resolve(JSON.parse(body));
    });
  });
};

module.exports = { handler };
