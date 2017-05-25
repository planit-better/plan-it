/*jshint esversion: 6*/
<<<<<<< HEAD

const express = require('express');
const { getNumber, groupText } = require('../../text-reminder/text.js');
const { evite } = require('../../evite/email.js');
=======
const express = require('express');
>>>>>>> 5b644e84a962356f582aeed71ccd76a92ffecfba
const guest = express.Router();
const { Guest } = require('../../models');

// everytime hit Get route will send texts
guest.get('/', ( req, res) => {
  console.log('hit guest');
<<<<<<< HEAD
  Guest.findAll({raw: true})
  .then((allGuest)=>{
    console.log(allGuest);
    console.log(allGuest.email);
    console.log(allGuest.name);
    // getNumber(allGuest);
    res.json(allGuest);
  // }).then((allGuest) => {
  //   console.log('2 then is hit ', allGuest);
  })
  .catch(err => {
=======
  Guest.all()
  .then((guest) =>{
    console.log(guest);
    res.json(guest);
  }).catch(err =>{
>>>>>>> 5b644e84a962356f582aeed71ccd76a92ffecfba
    res.send(err);
  });
});

guest.post('/', ( req, res ) => {
  console.log(req.body);
  Guest.create( req.body )
    .then( guest => {
      console.log(guest);
      res.json( guest );
    })
    .catch( err => {
      console.log(err);
      res.json( err );
    });
});

guest.delete('/:id', ( req, res ) => {
  let path = req.path.split('/')[1];
  console.log(req.body);
  Guest.destroy({
    where: {
      id: path
    }
  } )
  .then( guest => {
    console.log( guest );
    res.json( guest );
  })
  .catch( err => {
    console.log( err );
    res.json( err );
  });
});

guest.put('/:id', (req,res) => {
  let path = req.path.split('/')[1];
  Guest.update({
    name: req.body.name,
    will_attend: req.body.will_attend,
    accompanying_guests: req.body.accompanying_guests,
    can_drink: req.body.can_drink,
    diet_restriction: req.body.diet_restriction
  },  {
      where: {
        id: path
      }
    })
    .then(data => {
      //console.log('wat'+data);
      res.send('posted');
    });
});

module.exports = guest;