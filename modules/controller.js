const express = require("express");

const wrap = require("./wrap");

class Controller {
  constructor(service) {
    this.service = service;
    this.router = express.Router();
    this.healthCheck = this.healthCheck.bind(this);
    this.routes = {
      "/": [
        {
          method: 'get',
          cb: this.healthCheck,
        }
      ]
    };
  }

  async healthCheck(req, res) {
    res.status(200).json({message: 'Everything is OK!'});
  }

  registerRoutes() {
    Object.keys(this.routes).forEach((route) => {
      let handlers = this.routes[route];
      if (!handlers || !Array.isArray(handlers)) return;
      for (let handler of handlers) {
        this.router[handler.method](route, wrap(handler.cb));
      }
    });
  }
}

module.exports = Controller;
