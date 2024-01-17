/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

// Read the existing build number from the package.json file
const packageJsonPath = './package.json';
const packageJson = require(packageJsonPath);
const existingVersion = packageJson.version;

// Extract the major, minor, and build numbers
const versionNumbers = existingVersion.split('-')[1];
const [major, minor] = versionNumbers.split('.').map(Number);

const [build] = versionNumbers.split('.').slice(-1).map(Number);

// Increment the build number
const newBuildNumber = build + 1;

const version = `${year}.${month}.${day}-${major}.${minor}.${newBuildNumber}`;

// Update the package.json file with the new version number and build number
packageJson.version = version;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Generated version: ${version}`);
