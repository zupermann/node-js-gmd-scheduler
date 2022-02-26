const axios = require('axios');
const crypto = require('./crypto-util');

const baseURL = require('./config').url + '/nxt?';

GMD = {};
GMD.signTransaction = (unsignedTransaction, passPhrase) => {
  const signature = crypto.signBytes(unsignedTransaction, passPhrase);
  return unsignedTransaction.substr(0, 192) + signature + unsignedTransaction.substr(320);
}

GMD.isTransaction = (data) => {
    return data &&
    data.hasOwnProperty('transactionJSON') &&
    data.hasOwnProperty('unsignedTransactionBytes');
  }
  
GMD.isSignedTransactionResponse = (data) => {
    return GMD.isTransaction(data) &&
        data.hasOwnProperty('signatureHash') &&
        data.hasOwnProperty('fullHash');
};

GMD.apiCall = (method, params, callback) => {
    let pass = null;
    if(params && params.hasOwnProperty('secretPhrase')){
        pass = params.secretPhrase;
        delete params.secretPhrase; //password is not sent to server - remove it from params - it is needed only to do local signing
        if (!params.hasOwnProperty('publicKey')){
            params.publicKey = GMD.getPublicKey(pass);
        }
        
    }
    GMD.callHttp(method, baseURL + (new URLSearchParams(params)).toString(), pass, callback);
}

GMD.getPublicKey = (pass) => {
    return crypto.getPublicKey(crypto.strToHex(pass));
}


GMD.callHttp = (method, url, pass, callback) => {
    axios({method: method, url: url}).then((res)=> {
        console.log(`Status: ${res.status} body: ${JSON.stringify(res.data)}`);
        handleAPICallResponse(res.data, pass);
        if(callback) callback(res.data);
      }, (error) => {
          console.log(error);
          if(callback) callback(error);
      });
}
  
handleAPICallResponse = (data, pass) => {
    if(GMD.isTransaction(data) && !GMD.isSignedTransactionResponse(data)){ 
        const signature = GMD.signTransaction(data.unsignedTransactionBytes, pass);
        console.log('signature '+ signature);
        GMD.apiCall('post', {requestType: 'broadcastTransaction', transactionBytes: signature});
    }
}

module.exports = GMD;