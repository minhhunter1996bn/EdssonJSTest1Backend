const Controller = require('./controller');

class ModellingController extends Controller {
  constructor(service) {
    super(service);
    this.getAllDocumentDefinitions = this.getAllDocumentDefinitions.bind(this);
    this.getAllDocuments = this.getAllDocuments.bind(this);
    this.getLayout = this.getLayout.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
    this.routes['/document-definitions'] = [
      {
        method: 'get',
        cb: this.getAllDocumentDefinitions
      }
    ];
    this.routes['/documents'] = [
      {
        method: 'get',
        cb: this.getAllDocuments
      },
      {
        method: 'post',
        cb: this.saveDocument
      }
    ];
    this.routes['/layout'] = [
      {
        method: 'get',
        cb: this.getLayout
      }
    ]
    this.registerRoutes();
  }

  async getAllDocumentDefinitions(req, res) {
    const result = this.service.getAllDocumentDefinitions();
    res.status(200).json(result);
  }

  async getAllDocuments(req, res) {
    const result = this.service.getAllDocuments();
    res.status(200).json(result);
  }

  async getLayout(req, res) {
    const result = this.service.getLayout();
    res.status(200).json(result);
  }

  async saveDocument(req, res) {
    let body = req.body;
    try {
      const documentDefinitions = this.service.getAllDocumentDefinitions();
      const {check, message, convertedData} = this.service.validateDocument(documentDefinitions, body);
      if (!check) res.status(400).json(message);
      else {
        this.service.saveDocument(convertedData);
        res.status(200).json({message: 'Success'});
      }
    } catch(err) {
      res.status(400).json({message: err.message});
    }
  }
}

module.exports = (service) => {
  const controller = new ModellingController(service);
  return controller.router;
}