var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');
var sequenceGenerator = require('./sequenceGenerator');

router.post('/', function (req, res, next) {
  var maxContactId = sequenceGenerator.nextId("contacts");

  var contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group
  });
  contact.save(function (err, result) {
    res.setHeader('Content-Type', 'application/json');
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    return res.status(200).json({
      title: 'Contact Saved',
      obj: contact
    });
  });
});

router.get('/', function (req, res, next) {
  Contact.find()
    .populate('group')
    .exec(function (err, contacts) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: contacts
      });
    });
});

router.patch('/:id', function (req, res, next) {
  Contact.findById(req.params.id, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!contact) {
      return res.status(500).json({
        title: 'No Contact Found!',
        error: {contact: 'Contact not found'}
      });
    }
    contact.content = req.body.content;
    contact.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        contact: 'Updated contact',
        obj: result
      });
    });
  });
});

router.delete('/:id', function(req, res, next) {
  Contact.findById(req.params.id, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!contact) {
      return res.status(500).json({
        title: 'No Contact Found!',
        error: {contact: 'Contact not found'}
      });
    }
    Contact.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        contact: 'Deleted contact',
        obj: result
      });
    });
  });
});

module.exports = router;
