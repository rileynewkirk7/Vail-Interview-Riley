import express from 'express'
let app = express()

app.post('/ping', async (req, res) => {
  try {
    let message = req.body;
    console.log('Request body: ', req.body)
    console.log('Resp: ', res)
  
    let postmanEchoResponse = await fetch(`https://postman-echo.com/post?message=${message}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      }
    });
  
    if (!postmanEchoResponse.ok) {
      throw new Error(`Error processing Postman Echo Request: ${postmanEchoResponse.status}`)
    }

    let currentDate = new Date().getTime()
    console.log(`Postman Echo Response: ${await postmanEchoResponse.json()}`)
    let resp = {
      timestamp: currentDate,
      echo: await postmanEchoResponse.json(),
      env: process.env.ENV ? process.env.ENV : 'local',
      version: process.env.BUILD_VERSION ? process.env.BUILD_VERSION : '1.0.0'
    }
  
    // return resp
    res.send(resp)
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error processing: ${err}`)
      // return err.message
      res.send(err)
    } else {
      console.error(`Unexpected Error: ${err}`)
      // return 'Unexpected Error Occurred'
      res.send(err)
    }
  }
})

const port = process.env.PORT || 30000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})