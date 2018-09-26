'use strict';

export default (req, res, next) => {
  let error = { error: 'Resource Not Found' };

  console.log('404 error');
  res.status(404);
  res.setHeader('Content-Type', 'application/json');
  res.json(error);
};