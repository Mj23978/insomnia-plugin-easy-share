// let assert = require('assert');
// let mocha = require('mocha');
let axios = require('axios');
// const { get_request_collection, post_request_collection, get_id_and_pwd } = require('./conn')

describe('Plugin Tests', function () {
  this.timeout(400000);
  it('test getting plugins from server', async function (done) {
    const url = new URL('file-sample_150kB.pdf', 'https://file-examples.com/wp-content/uploads/2017/10/').href
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
});
