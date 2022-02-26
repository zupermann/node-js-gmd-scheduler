const GMD = require('./gmd-crypto');
const config = require('./config');


require('node-cron').schedule('* * * * *', () => {
  const dataSendMoney = {
    requestType: 'sendMoney',
    recipient: 'GMD-43MP-76UW-L69N-ALW39',
    amountNQT: '10000000000',
    secretPhrase: config.passPhrase1,
    feeNQT: '1000000000',
    deadline: '15'
  };

  GMD.apiCall('post', dataSendMoney, (res)=> {
    console.log('This is a callback example. Data received back on api calls:\n'+JSON.stringify(res, null, 2));
  });
});



