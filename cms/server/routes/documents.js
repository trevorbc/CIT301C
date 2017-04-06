var express = require('express');
var router = express.Router();
var Document = require('../models/document');
var sequenceGenerator = require('./sequenceGenerator');

router.post('/', function (req, res, next) {
  var maxDocumentId = sequenceGenerator.nextId("documents");

  var document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });
  document.save(function (err, result) {
    res.setHeader('Content-Type', 'application/json');
    if (err) {
      return res.status(500).json({
        title: 'Error saving document',
        error: err
      });
    }
    return res.status(200).json({
      title: 'Document Saved',
      obj: document
    });
  });
});

router.get('/', function (req, res, next) {
  Document.find()
    .populate('sender')
    .exec(function (err, documents) {
      if (err) {
        return res.status(500).json({
          title: 'Error getting documents',
          error: err
        });
      }
      res.status(200).json({
        document: 'Success',
        obj: documents
      });
    })
  });

router.patch('/:id', function (req, res, next) {
  Document.findOne({'id': req.params.id}, function (err, document) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!document) {
      return res.status(500).json({
        title: 'No Document Found!',
        error: {document: 'Document not found'}
      });
    }
    document.name= req.body.name;
    document.id= req.body.id;
    document.description= req.body.description;
    document.url= req.body.url;
    document.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        document: 'Updated document',
        obj: result
      });
    });
  });
});

router.delete('/:id', function(req, res, next) {
  Document.findOne({'id': req.params.id}, function (err, document) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!document) {
      return res.status(500).json({
        title: 'No Document Found!',
        error: {document: 'Document not found'}
      });
    }
    document.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        document: 'Deleted document',
        obj: result
      });
    });
  });
});

module.exports = router;
