const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const cors = require('cors');
const config = require('config');
const port = config.get('app.port');
const MongoClient = require('mongodb').MongoClient;
const service = require('feathers-mongodb');
const utils = require('./lib/utils');

const app = express(feathers());

app.use(cors({
  origin: config.get('app.corsOrigin')
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());

app.use('/recipes', service({
  paginate: {
    default: 10,
    max: 50, 
  }
}));


app.service('recipes').hooks({
  before: {
    create: [({data}) => utils.validateRecipe(data)],
    update: [({data}) => utils.validateRecipe(data)],
  },
});

app.use(express.errorHandler());

(async () => {
  try {
    const client = await MongoClient.connect(`mongodb://${config.get('db.uri')}/${config.get('db.name')}`, {useNewUrlParser: true})
    const recipesService = app.service('recipes')
    recipesService.Model = client.db(config.get('db.name')).collection('recipes')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})();


app.listen(port, () => {
  console.log(`Feathers server listening on port ${port}`);
});