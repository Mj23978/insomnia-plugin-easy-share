// let assert = require('assert');
// let mocha = require('mocha');
let axios = require('axios');
// const { get_request_collection, post_request_collection, get_id_and_pwd } = require('./conn')

describe('Plugin Tests', function () {
  this.timeout(400000);
  it('test getting collections from server', async function (done) {
    const url = new URL('1', 'http://localhost:3000/collections/').href
    console.log(url)
    try {
      const { data, status } = await axios.get(url)
      console.log(`data : ${data}, ${status}`)
      done(new Error())
    } catch (e) {
      console.log(e)
        done(e)
    }
    // let { server, id } = get_request_collection('', 'analysis_options.yaml')
    // console.log(`data: ${server}, ${id}`)
  })
  
  it('test post collections to server', async function (done) {
    const url = new URL('', 'http://localhost:3000/collections/').href
    console.log(url)
    try {
      const { data, status } = await axios.post(url, {
        data: 'Fred',
        name: 'Flintstone',
        collectionId: '2',
      })
      console.log(`data : ${data}, ${status}`)
      done()
    } catch (e) {
      console.log(e)
        done(e)
    }
    // let { server, id } = get_request_collection('', 'analysis_options.yaml')
    // console.log(`data: ${server}, ${id}`)
  })
});
