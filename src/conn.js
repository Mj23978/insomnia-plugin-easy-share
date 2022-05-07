const axios = require('axios')

/**
 * Post the request collection with id and password
 * @param server
 * @return {Promise<(number|T)[]|(number|any)[]>}
 */
async function get_id_and_pwd(server) {
    try {
        const { data, status } = await axios.get(server)
        return [status, data]
    } catch (e) {
        if (e.response)
            return [e.response.status, e.response.data]
        else
            return [408, { message: "Connection issue" }]
    }
}


/**
 * Post the request collection with id and password
 * @param data
 * @param request_collection_json
 * @param server
 * @param id
 * @param pwd
 * @return {Promise<(number|T)[]|(number|any)[]>}
 */
async function post_request_collection(request_collection_json, { server, id, name }) {
    const url = new URL('collections/', server).href
    try {
        let inp = request_collection_json
        console.log(inp['resources'])
        const { data, status } = await axios.post(
            url, { data: request_collection_json, name: name, collectionId: id },
        )
        return [status, data]
    } catch (e) {
        if (e.response)
            return [e.response.status, e.response.data]
        else
            return [408, { message: "Connection issue" }]
    }
}


/**
 * Get the request collection using id
 * @param data
 * @param server
 * @param id
 * @return {Promise<(number|T)[]|(number|any)[]>}
 */
async function get_request_collection({ server, id }) {
    const url = new URL(`collections/${id}`, server).href

    try {
        const { data, status } = await axios.get(url)
        return [status, data]
    } catch (e) {
        if (e.response)
            return [e.response.status, e.response.data]
        else
            return [408, { message: "Connection issue" }]
    }
}


module.exports = { get_request_collection, post_request_collection }