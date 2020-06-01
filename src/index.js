import server from './sever'

const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log("the server is listening on " + port + " on this environment " + process.env.ENVIRONMENT)
})









// exotic frog lizard harsh churn poverty veteran citizen emerge kick domain question