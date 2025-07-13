const Joi = require('joi');
const review = require('./models/review');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.alternatives().try(
        Joi.string().uri().allow('', null),
        Joi.object({
        url: Joi.string().uri().required(),
        filename: Joi.string().allow('', null)
  })
).optional().strip()
    }).required()
});

//  image: Joi.string().allow("", null)


module.exports.reviewSchema = Joi.object({
    review:Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
})




module.exports.mapSchema = Joi.object({
  title: Joi.string().required(),
  address: Joi.string().required(),
  location: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required()
  }).required()
});

