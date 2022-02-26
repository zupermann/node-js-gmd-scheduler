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
