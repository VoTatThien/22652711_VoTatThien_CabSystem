const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const projectDir = path.resolve(__dirname, '..', '..');
process.chdir(projectDir);

const swaggerSpec = require('../config/swagger');
const yamlString = YAML.stringify(swaggerSpec);

const apiSpecDir = path.join(projectDir, 'API specification');
if (!fs.existsSync(apiSpecDir)) {
  fs.mkdirSync(apiSpecDir, { recursive: true });
}

// Write openapi.yaml in 'API specification' folder
fs.writeFileSync(path.join(apiSpecDir, 'openapi.yaml'), yamlString, 'utf8');
console.log('Created: API specification/openapi.yaml');

// Also write openapi.yaml in root folder
fs.writeFileSync(path.join(projectDir, 'openapi.yaml'), yamlString, 'utf8');
console.log('Created: openapi.yaml');
