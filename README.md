# Node JS GMD integration

- index.js is an example on how to call APIs on scheduled bases on a remote node. 
- Example shows how to make a transaction periodically on a remote node. Schedule is set via cron syntax (please see details of the syntax and man page here https://crontab.guru/ )
- config.js holds configs like url and pass phrase. Can be edited to hold any info.
- Local signing is performed, the passPhrase is never sent over wire.
- This is a skeleton for a future NodeJS GMD SDK.

### Instructions:
```
npm install
npm start
```

### Examples on hot to call the GMD node API
- For a complete list of API methods and thier exact parameters you can see them on any node in a browser at address <GMD node address>/test (e.g. https://node.thecoopnetwork.io/test )
- Getting last transactions:
    - optional parameters allow filtering by transaction type, subtype, sender or receiver.
```
const paramsGetTransactions = { 
    requestType: 'getTransactionsBulk',
    pageSize: 5,
    page: 0
}
GMD.apiCall('get', paramsGetTransactions, (res)=>{
    console.log('Result trasnactions: \n'+JSON.stringify(res, null, 2));
})
```
- Getting accounts (ordered by balance):
```
const paramsGetAccounts = {
    requestType: 'getAccountsBulk',
    pageSize: 5,
    page: 0
}
```