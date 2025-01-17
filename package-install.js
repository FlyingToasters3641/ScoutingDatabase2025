const { execSync } = require('child_process');
const directories = ['./', './server', './client'];

directories.forEach(dir => {
  console.log(`Installing npm packages in ${dir}`);
  execSync(`cd ${dir} && npm install`, { stdio: 'inherit' });
});
