# How to install and start service

after clone the project then

1. first copy .env.example to .env file and setup the env like my .env that send in to email.
2. run code below to start server

```
docker compose up -d
```

to start the service

# Authentication

1. register the account by api route
   `/api/v1/user`

- this route has description

```
if this user for the official account => set isOfficial to true
the official account use to take loan from customer account
```

2. login by api
   `/api/v1/user/login`

- this route return userId for use to many api below

# API For Display UI

1. Jitta Card Wallet

- use api
  `/api/v1/jitta-card-wallet/display/{userId}`
  to get all data that necessary to display on Jitta Card Wallet Page

2. Earn Wallet

- use api
  `/api/v1/earn-wallet/display/{userId}`
  to get all data that necessary to display on Earn Wallet Page

3. Debt

- use api
  `/api/v1/debt/display/{userId}`
  to get the debts to display on Debt Page

# Transaction

use api

```
/api/v1/debt/display/{userId}
```

to make the transaction via Transaction Type below

```
 # transaction type
 1. ฝากเงิน (deposit)
 2. ถอนเงิน (withdraw)
 3. จ่ายเงิน (pay) -> round up
 4. โอนเงิน (transfer)
 5. ยิมเงิน (loan)
 6. ชำระหนี้ (debt payment)
```

more desription in Swagger
