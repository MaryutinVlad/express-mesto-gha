const allowedCors = [
  'http://api.seaotter.valley.nomoreparties.sbs',
  'https://api.seaotter.valley.nomoreparties.sbs',
  'http://seaotter.valley.nomoredomains.xyz',
  'https://seaotter.valley.nomoredomains.xyz',
  'http://localhost:3000',
  'https://localhost:3000',
];

const allowedMethods = 'GET, HEAD, PUT, DELETE, POST, PATCH';

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethods);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
};
