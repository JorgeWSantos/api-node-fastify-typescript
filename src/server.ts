import fastify from 'fastify'

const app = fastify()

app.get('/hello', () => {
    return 'Hello worldss'
})

app.listen({
    port: 3333
}).then(() => console.log('http server running'))