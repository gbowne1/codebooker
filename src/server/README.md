1. First, you'll need to have a running MongoDB server on your localhost. You can do this by navigating into `/src/server/setup/`, then
    1. run `docker-compose up -d`, then `node setup.js`
    2. Or, using bash, execute `setup.sh`.

> **_NOTE:_** To remove the MongoDB container run `docker-compose down` or, using bash, execute `cleanup.sh`

2. Create .env and copy the data in .variable.env and paste it in .env file

3. Put the Port number and mongo url

4. Run setup.js file inside setup folder to create a dummy user

```
email: "test@gmail.com" or username: "test"
password: "test"
```

5. Run the index.js to run the server
