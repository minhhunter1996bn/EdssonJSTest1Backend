const fs = require('fs');
const documentDefinitionPath = 'file-data/document-definitions.json';
const documentPath = 'file-data/document.json';
const layoutPath = 'file-data/layout.json';

const getAllDocumentDefinitions = () => {
  const results = fs.readFileSync(documentDefinitionPath);
  return JSON.parse(results.toString());
}

const getAllDocuments = () => {
  const results = fs.readFileSync(documentPath);;
  return JSON.parse(results.toString());
}

const getLayout = () => {
  const results = fs.readFileSync(layoutPath);;
  return JSON.parse(results.toString());
}

const validateDocument = (documentDefinitions, data) => {
  let check = true;
  let message = [];
  let convertedData = {};
  const fields = documentDefinitions.schema.fields;
  for (let key of Object.keys(data)) {
    const field = fields.find(item => item._id == key);
    if (!field) throw new Error(`Field ${key} is not exist`);
    convertedData[field.name] = data[key];
    const type = typeof data[key];
    if (type != field.type) {
      check = false;
      message.push(`${key} is not ${field.type}`);
    }
    if (type == 'string') {
      if (data[key].length > field.maxLength) {
        check = false;
        message.push(`${key} is not over ${field.maxLength}`);
      }
    }
  }
  return {
    check,
    message,
    convertedData
  }
}

const saveDocument = (data) => {
  const results = fs.readFileSync(documentPath);;
  let currentObj = JSON.parse(results.toString());
  currentObj.push(data);
  fs.writeFileSync(documentPath, JSON.stringify(currentObj));
}

module.exports = {
  getAllDocumentDefinitions,
  getAllDocuments,
  getLayout,
  validateDocument,
  saveDocument
}