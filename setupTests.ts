import nock from "nock";

beforeAll(() => {
  // This is to ensure no real http requests are sent during testing
  nock.disableNetConnect();
});


afterAll(() => {
    nock.restore();
})
