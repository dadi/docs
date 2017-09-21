git pull origin master
sudo npm install
sudo npm prune
sudo rm -r /dadi/docs/cache/
sudo pm2 restart "DADI DOCS"
