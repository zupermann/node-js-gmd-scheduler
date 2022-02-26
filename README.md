# node-js-gmd-scheduler

- index.js is an example on how to call APIs on scheduled bases on a remote node. 
- Example shows how to make a transaction every 15 minutes on a remote node.
- Local signing is performed, the passPhrase is never sent over wire.
- In real usecase, the passPhrase should pe kept in a secured file, not hardcoded as in this example.