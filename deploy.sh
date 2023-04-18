echo "Kill all the running PM2 actions"
sudo pm2 kill

echo "Install app dependencies"
sudo npm ci

echo "Build your app"
sudo npm run build

echo "Run new PM2 action"
sudo pm2 start --name bundle-back ./dist/main