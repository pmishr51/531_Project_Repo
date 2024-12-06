const Joi = require("joi");

exports.validateArtQuery = (query) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    artist: Joi.string().optional(),
  });

  return schema.validate(query);
};
