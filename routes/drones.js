const express = require('express');
const async = require('hbs/lib/async');
const router = express.Router();
const Drone = require('../models/Drone.model')
// require the Drone model here

router.get('/drones', async (req, res, next) => {
 const drones = await Drone.find()
 res.render('drones/list', {drones})
});

router.get('/drones/create', async (req, res, next) => {
  res.render('drones/create-form.hbs')
});

router.post('/drones/create',async (req, res, next) => {
  try {
    await Drone.create(req.body)
    res.redirect("/drones")
  } catch (error) {
    console.log(error)
    next(error)
  }
});

router.get('/drones/:id/edit', async (req, res, next) => {
  const id = await Drone.findById(req.params.id)
  res.render('drones/update-form.hbs', id)
 
});

router.post('/drones/:id/edit', async (req, res, next) => {
  const info = req.body
  await Drone.findByIdAndUpdate(req.params.id, info)
  res.redirect("/drones")
});

router.post('/drones/:id/delete', async (req, res, next) => {
  await Drone.findByIdAndDelete(req.params.id)
  res.redirect('/drones')
});

module.exports = router;
