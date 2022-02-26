const cron = require('node-cron');
const GMD = require('./gmd-crypto');
const config = require('./config');


const dataSendMoney = {
  requestType: 'sendMoney',
  recipient: 'GMD-43MP-76UW-L69N-ALW39',
  amountNQT: '10000000000',
  secretPhrase: config.passPhrase1,
  feeNQT: '1000000000',
  deadline: '15'
};

GMD.apiCall('post', dataSendMoney);
cron.schedule('0,15,30,45 * * * *', () => {
  console.log('Making request '+dataSendMoney);
  GMD.apiCall('post', dataSendMoney);
});

