import app from './app.js';
const port = 8000;

console.log(process.env);

app.listen(port, (err) => {
  console.log(`Listening on port ${port}`);
});
