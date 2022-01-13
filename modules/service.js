const fs = require('fs');
const documentDefinitionPath = 'file-data/document-definitions.json';

const getDocumentDefinition = () => {
  fs.readFile(documentDefinitionPath, (err, data) => {
    if (err) console.log(err);
    else console.log(JSON.parse(data.toString()));
  })
}

module.exports = {
  getDocumentDefinition
}