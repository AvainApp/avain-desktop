const fs = require('fs');
const projectPackage = require('./package.json');
const appPackage = require('./app/package.json');

if (appPackage.version === projectPackage.version) {
  process.exit();
}

appPackage.version = projectPackage.version;

fs.writeFileSync('./app/package.json', JSON.stringify(appPackage, null, 2) + '\n');

console.log('version', projectPackage.version);
