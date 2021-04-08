const { PORT } = require('./config/default.config');
const app = require('./server');

const port = PORT || 6000;
app.listen(port, () => {
  console.log('Server Started Successfully!');
});
