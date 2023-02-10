let request = require('supertest')
const baseUrl = 'http://localhost:30000'

describe("Test Echo App", () => {
  beforeEach(() => {

  })

  afterEach(() => {

  })


  it("POST /ping", async () => {
    let message = 'Test MESSAGE'
    let resp = await request(baseUrl).post('/ping').send(message)
    console.log(resp)
  });
})
