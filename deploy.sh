echo "Kill all the running PM2 actions"
sudo pm2 kill

echo "Jump to app folder"
cd /var/www/bundle-backend.kz/html/bundle-back/

echo "Update app from Git"
git pull

echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
sudo npm install

echo "Build your app"
sudo npm run build

echo "Download pm2"
sudo npm i pm2@latest -g

echo "Run new PM2 action"
sudo pm2 start ./dist/main.js --watch -i max