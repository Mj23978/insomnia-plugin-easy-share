const util = require('util')
const {
    read_env_and_req_collection, ENV_VAR_NAME_SERVER
} = require("./utils")

const { get_request_collection, post_request_collection } = require('./conn')


/**
 * Workspace Actions
 * @type {[{icon: string, action: (function(*, *): boolean), label: string},
 * {icon: string, action: ((function(*, *): Promise<boolean>)|*), label: string},
 * {icon: string, action: (function(*, *): boolean), label: string}]}
 */
module.exports.workspaceActions = [
    {
        label: 'Share collection',
        icon: 'fa-upload',
        action: async (context, models) => {
            const { request_collection_json, server } = await read_env_and_req_collection(context, models)

            if (!server) {
                context.app.alert("Error",
                    `Sorry, 
                        ${ENV_VAR_NAME_SERVER}
                        are need to be in the base environment.
                        If you have already configured and still showing this message. Please try creating sample
                        request, It will trigger insomnia to refresh base environment to resources`
                )
                return false
            }

            const workspaceId = models.workspace._id;
            const workspaceName = models.workspace.name;
            const [http_code, data] = await post_request_collection(
                request_collection_json,
                { server, id: `${workspaceId}`, name: workspaceName }
            )
            console.log(`${http_code}, ${data}`)

            if (http_code === 200 || http_code === 201) {
                context.app.alert("Done",
                    `Success, collection can be accesses using SERVER="${server}". 
                     You can user direct link "${server}/collections/${workspaceId}" to fetch the workspace.`
                )
                return true
            }

            context.app.alert("Error", data.message)
            return false
        },
    },
    {
        label: 'Download collection',
        icon: 'fa-download',
        action: async (context, models) => {
            const workspaceId = models.workspace._id;
            const { server, request_collection } = await read_env_and_req_collection(context, models)

            if (!server) {
                context.app.alert("Error",
                    `Sorry, 
                        ${ENV_VAR_NAME_SERVER}
                        are need to be in the base environment.
                        If you have already configured and still showing this message. Please try creating sample
                        request, It will trigger insomnia to refresh base environment to resources`
                )
                return false
            }

            const [status, data] = await get_request_collection({ server, id: workspaceId })
            if (status === 200) {
                const json = data.data
                // await context.app.alert("Info", json)
                const ret = await context.data.import.raw(json)
                await context.app.alert("Info", "Success, Check your dashboard, it will be there")
                return true
            }

            context.app.alert("Error", data.message)
            return false
        },
    },
];
