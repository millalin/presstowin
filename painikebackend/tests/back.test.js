const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index_back')

const api = supertest(app)
const Player = require('../models/player')


const initPlayers = [
    {
        username: "user1",
        points: "10",
        online: true,
    },
    {
        username: "user2",
        points: "20",
        online: false,
    },

]

beforeEach(async () => {
    await Player.deleteMany({})

    let playerObject = new Player(initPlayers[0])
    await playerObject.save()

    playerObject = new Player(initPlayers[1])
    await playerObject.save()
})

test('players are returned as json', async () => {
    await api
        .get('/api/players')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all players are returned', async () => {
    const response = await api.get('/api/players')
    expect(response.body.length).toBe(initPlayers.length)
})

test('returned playerlist contains right players', async () => {
    const response = await api.get('/api/players')

    const returnedPlayers = response.body.map(r => r.username)
    expect(returnedPlayers).toContain('user1')
    expect(returnedPlayers).toContain('user2')

})

test('a new player can be added ', async () => {
    const newPlayer = {
        username: "user3",
        points: "20",
        online: false,
    }

    await api
        .post('/api/players')
        .send(newPlayer)


    const response = await api.get('/api/players')

    const name = response.body.map(r => r.username)

    expect(response.body.length).toBe(initPlayers.length + 1)
    expect(name).toContain(
        'user3'
    )
})


test('player points can be changed', async () => {

    const list = await api.get('/api/players')
    const player = list.body[0]

    const updatedPlayer = { ...player, points: player.points - 1 }

    await api
        .put(`/api/players/${player.id}`)
        .send(updatedPlayer)
        .expect(200)


    const newList = await api.get('/api/players')
    const changed = newList.body[0]

    expect(changed.points).toBe(player.points - 1)
})


test('get player fails with code 400 if id invalid', async () => {
    const wrongId = 'invalid'

    await api
        .get(`/api/players/${wrongId}`)
        .expect(400)
})

test('get player returns right player with valid id', async () => {
    const list = await api.get('/api/players')
    const initPlayer = list.body[0]

    const player_id = list.body[0].id

    const returnedPlayer =
        await api
            .get(`/api/players/${player_id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)


    expect(returnedPlayer.body).toEqual(initPlayer)
})


afterAll(() => {
    mongoose.connection.close()
})