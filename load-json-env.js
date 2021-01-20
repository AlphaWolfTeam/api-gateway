/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const fs = require('fs');

const TEMPLATE_FILE_NAME = './docker-compose.template.yml';
const OUTPUT_FILE_NAME = './docker-compose.yml';
const SETTING_LIST = [
  {
    inputFile: './spike-proxy/incoming-services.settings.json',
    templateString: '##_INCOMING_SERVICES_##',
  },
  {
    inputFile: './spike-proxy/outgoing-services.settings.json',
    templateString: '##_OUTGOING_SERVICES_##',
  },
];

async function loadJsonSettings(inputFile) {
  const rawInput = fs.readFileSync(inputFile, 'utf8');
  return JSON.parse(rawInput);
}

async function loadTemplateFile(templateFile) {
  console.log(`Loading template file: ${templateFile}`);
  return fs.readFileSync(templateFile, 'utf8');
}

async function replaceSettings(templateData, templateString, inputFile) {
  console.log(`Replacing ${templateString} with template data from ${inputFile}`);
  const jsonInput = await loadJsonSettings(inputFile);
  return templateData.replace(templateString, `'${JSON.stringify(jsonInput)}'`);
}

async function writeToDestination(outputFile, outputContent) {
  console.log(`Writing to destination file ${outputFile}`);
  fs.writeFile(outputFile, outputContent, 'utf8', (err2) => {
    if (err2) {
      console.log(`Error in loading output file ${outputFile}: ${err2}`);
    }
  });
}

async function main() {
  const templateFile = await loadTemplateFile(TEMPLATE_FILE_NAME);
  let outputData = templateFile;
  for await (const settings of SETTING_LIST) {
    outputData = await replaceSettings(outputData, settings.templateString, settings.inputFile);
  }
  writeToDestination(OUTPUT_FILE_NAME, outputData);
}

main();
