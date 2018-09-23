const Joi = require('joi');
const errors = require('@feathersjs/errors');

const schema = Joi.object().keys({
    name: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()).min(1).required(),
})

const validateRecipe = (recipe) => {
  if (!recipe) throw new errors.BadRequest('Recipe is not valid');

  const result = Joi.validate(recipe, schema);

  if (result.error) {
    throw new errors.BadRequest('Recipe is not valid');
  }
}

module.exports = {
  validateRecipe,
}