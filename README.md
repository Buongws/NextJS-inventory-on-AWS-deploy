# next-nodejs-dashboard

# next-node

when start on AWS RDS

sudo su -

nano .env change directory DATABASE

pm2 delete all

npx prisma generate

npx prisma migrate dev --name init

npm run seed

and run pm2 start

pm2 start ecosystem.config.js

pm2 monit
