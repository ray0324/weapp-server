# Weapp-server quick template

## Environment

To start the app,please create runtime envrionment first, it's very easy to
config.
Create an file named '.env' at the root of this project and config it like
this: 

```conf
APP_SECRET=secret
MONGODB_HOST='mongodb://user:pass@localhost:27017/db'
PORT=3000
LOG_LEVEL=trace
```

## Start

```bash
node ./bin/www
```