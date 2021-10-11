exports.handler = async function(event, context) {
	console.log("in the server", event.queryStringParameters.code);
    return {
        statusCode: 200,
        body: JSON.stringify({message: "Hello World"})
    };
}