'use strict';

export default (err, req, res, next) => {
  let error = { error: err };

  res.status(500).json(error);
};
