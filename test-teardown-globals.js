// This is to fix some memory leak issues I ran into when testing API routes
// To resolve this I followed the solution described here: https://github.com/visionmedia/supertest/issues/520#issuecomment-768148875
module.exports = () => {
  process.exit(0);
};
