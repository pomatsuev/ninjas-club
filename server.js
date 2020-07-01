const app = require('express')();
const http = require('http');

const PORT = 5000;

let ID = 7;

app.use(
  require('express').json({
    extended: true,
  })
);

const authMiddleware = (req, res, next) => {
  if (req.headers['auth-id']) {
    req.ninjaId = req.headers['auth-id'];
    next();
  } else {
    res.status(403).json({ message: 'only real ninjas!' });
  }
};

const filterID = (id) => (ninja) => ninja.id === id;
const filterLogin = (login) => (ninja) => ninja.login === login;
const filterSearchFullName = (search) => (ninja) => new RegExp(search, 'gi').test(ninja.fullName);

const MOKED_DB = {
  users: [
    { id: 1, login: 'nagato', fullName: 'Fujibayashi Nagato', pass: '1', friends: [] },
    { id: 2, login: 'mochi', fullName: 'Momochi Sandayu', pass: '1', friends: [] },
    { id: 3, login: 'goemon', fullName: 'Ishikawa Goemon', pass: '1', friends: [] },
    { id: 4, login: 'hanzo', fullName: 'Hattori Hanzo', pass: '1', friends: [] },
    { id: 5, login: 'zuki', fullName: 'Mochizuki Chiyome', pass: '1', friends: [] },
    { id: 6, login: 'fuma', fullName: 'Fuma Kotaro', pass: '1', friends: [] },
    { id: 7, login: 'kawa', fullName: 'Jinichi Kawakami', pass: '1', friends: [] },
  ],
};

app.get('/api/all', (req, res) => {
  res.status(200).json(MOKED_DB.users);
});

app.get('/api/ninja', (req, res) => {
  const { searchName } = req.query;
  !searchName && res.status(400).json({ message: 'who are we finding?' });
  res.status(200).json(MOKED_DB.users.filter(filterSearchFullName(searchName)));
});

app.post('/api/reg', (req, res) => {
  const { login, fullName, pass } = req.body;
  if (MOKED_DB.users.filter(filterLogin(login)).length > 0)
    return res.status(400).json({ message: 'such a ninja is exist' });
  const newNinja = { id: ++ID, login, fullName, pass, friends: [] };
  MOKED_DB.users.push(newNinja);
  res.status(201).json({ status: 'ok' });
});

app.post('/api/login', (req, res) => {
  const { login, pass } = req.body;
  const ninjaFromBase = MOKED_DB.users.find(filterLogin(login));
  if (ninjaFromBase && ninjaFromBase.pass === pass) {
    return res.status(200).json(ninjaFromBase);
  }
  return res.status(400).json({ message: 'we are not ninja!' });
});

app.get('/api/friends', authMiddleware, (req, res) => {
  const authNinja = MOKED_DB.users.find(filterID(Number(req.ninjaId)));
  res.status(200).json(authNinja.friends.map((id) => MOKED_DB.users.find(filterID(id))));
});

app.post('/api/friends', authMiddleware, (req, res) => {
  const { friendId } = req.body;
  const authNinja = MOKED_DB.users.find(filterID(Number(req.ninjaId)));
  authNinja.friends.push(Number(friendId));
  res.status(201).json({ status: 'ok' });
});

app.delete('/api/friends', authMiddleware, (req, res) => {
  const { friendId } = req.body;
  const authNinja = MOKED_DB.users.find(filterID(Number(req.ninjaId)));
  authNinja.friends = authNinja.friends.filter((id) => id !== Number(friendId));
  res.status(201).json({ status: 'ok' });
});

function main() {
  const httpServer = http.createServer(app);
  httpServer.listen(PORT);
  console.log(`SERVER OK! PORT: ${PORT}`);
}

main();
