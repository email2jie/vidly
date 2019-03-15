const express = require('express');
const router = express.Router();
const {Customer, validateCustomer} = require('../models/customer.js');

router.get('/', async (req, res) => {
  const result = await Customer.find();
  res.send(result);
});

async function postItem(req){
  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
  try {
    await customer.save();
    return customer;
  } catch (e) {
    return e.message;
  }
}

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if(error){
    return res.status(400).send(error.details[0].message);
  }
  const result = await postItem(req)
  res.send(result);
});

router.put('/:id', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  const result = await Customer.findOneAndUpdate(req.params.id,
    {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
      }
    }, {new: true}
  );
  if(!result) return res.status(404).send('The customer with the given ID was not found.');

  res.send(result);

});

router.delete('/:id', async (req, res) => {
  const result = await Customer.findByIdAndDelete(req.params.id);
  if(!result) return res.status(404).send('The customer with the given ID was not found.');
  res.send(result);
});


module.exports = router;
