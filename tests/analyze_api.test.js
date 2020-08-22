const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('results are returned as json', async () => {
  const text = {
    'text': 'hello '
  }
  await api
    .post('/analyze')
    .send(text)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('text with non-alphabet characters, capitals, and extra spaces', async () => {
  const text = {
    'text': '  hello ,!%  ¤HE 5'
  }
  const response = await api
    .post('/analyze')
    .send(text)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const results = response.body
  expect(results.textLength.withSpaces).toBe(18)
  expect(results.textLength.withoutSpaces).toBe(12)
  expect(results.wordCount).toBe(4)
  expect(results.characterCount).toStrictEqual([{ 'e':2 },{ 'h':2 }, { 'l':2 },{ 'o':1 },])
})

test('empty text', async () => {
  const text = {
    'text': ''
  }
  const response = await api
    .post('/analyze')
    .send(text)
    .expect(200)

  const results = response.body
  expect(results.textLength.withSpaces).toBe(0)
  expect(results.textLength.withoutSpaces).toBe(0)
  expect(results.wordCount).toBe(0)
  expect(results.characterCount).toStrictEqual([])
})

test('fails with status 400 sent text is a number', async () => {
  const text = {
    'text': 123
  }
  const response = await api
    .post('/analyze')
    .send(text)
    .expect(400)

  const results = response.body
  expect(results).toStrictEqual( { 'error': 'The text to analyze must be a string' })
})

test('fails with status 404 bad route', async () => {
  const text = {
    'text': 'hello'
  }
  const response = await api
    .post('/analyz')
    .send(text)
    .expect(404)

  const results = response.body
  expect(results).toStrictEqual({ 'error': 'unknown endpoint' })
})

