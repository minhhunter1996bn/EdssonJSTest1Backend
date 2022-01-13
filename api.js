module.exports = (express, service) => {
  const router = express.Router();
  const controller = require('./modules/modelling.controller')(service);
  router.use('/modelling', controller);
  return router;
}