const request = require('supertest')
const {test, expect, describe} = require('@jest/globals')
const { app } = require('../src')

describe('#dicio-api test suit', () => {
  const response =  request(app)
  describe('#meanings', () => {
    test("should be returns array with word informations", async () => {
      const expectJSON = [
        {
          class: 'substantivo masculino',
          meanings: [
            'Prova; exame feito para testar, para avaliar as características ou qualidades de algo ou de alguém: teste de personalidade.',
            'Todo mecanismo que busca verificar ou provar a verdade de: teste de velocidade.',
            '[Por Extensão] Conjunto de questões que, orais ou escritas, avaliam os conhecimentos específicos de um aluno, candidato, concorrente etc.',
            '[Por Extensão] O que se utiliza para realizar esse exame: teste escrito.',
            '[Medicina] Exame através do qual se consegue fazer um diagnóstico: teste sanguíneo.'
          ],
          etymology: 'Etimologia (origem da palavra teste). Do inglês test.'
        },
        {
          class: 'substantivo feminino',
          meanings: [
            'Uso Antigo. Testemunha; pessoa que presenciou ou assistiu algum crime ou fato.'
          ],
          etymology: 'Etimologia (origem da palavra teste). Do latim testis.is.'
        }
      ]
      const result = await response.get('/meanings/teste')
      expect(result.body).toEqual(expectJSON)
    })
    test("should be return a error message", async () => {
      const expectJSON = { "error": "Request failed with status code 404" }
      const result = await response.get('/meanings/inexistent-word')
      const { body, status } = result
      expect(body).toMatchObject(expectJSON)
    })
  })

  describe('#syllables',() => {
    test('should be returns an object with word syllables info', async () => {
      const expectJSON = {
        "syllablesText": "tes-te",
        "syllablesCount": 2
      }
      const result = await response.get('/syllables/teste')
      const { body } = result
      expect(body).toMatchObject(expectJSON)
    })
    test('should be return an object with error infos', async () => {
      const expectJSON = {
        "error": "Request failed with status code 404"
      }
      const result = await response.get('/syllables/inexistent-word')
      const { status, body } = result
      expect(body).toMatchObject(expectJSON)
    })
  })
  describe('#sentences',() => {
    test("should be returns an object with sentences info", async () => {
      const expectJSON = [
        {
          "sentence": "Eis um teste para saber se você terminou sua missão na Terra: se você está vivo, não terminou.",
          "author": "- Richard Bach"
        },
        {
          "sentence": "Nós não conhecemos o verdadeiro valor de nossos momentos até que eles se submetam ao teste da memória.",
          "author": "- Georges Duhamel"
        },
        {
          "sentence": "Além disso, ambos os países destacarão a importância da nova resolução do Conselho de Segurança das Nações Unidas, que condenou e impôs mais sanções à Coreia do Norte após o teste nuclear do dia 25 de maio.",
          "author": "Folha de S.Paulo, 28/06/2009"
        },
        {
          "sentence": "As amostras poderão ser enviadas pelo correio, o que poderá ampliar o acesso ao teste em locais distantes dos centros urbanos.",
          "author": "Folha de S.Paulo, 28/06/2009"
        },
        {
          "sentence": "Até 22 de julho, o ministério vai receber contribuições da sociedade em consulta pública sobre a portaria que atualiza as regras para teste de HIV.",
          "author": "Folha de S.Paulo, 28/06/2009"
        }
      ]
      const result = await response.get('/sentences/teste')
      const { body } = result
      expect(body).toMatchObject(expectJSON)
    })
    test("should be returns an object with sentences error info", async () => {
      const expectJSON = {
        "error": "Request failed with status code 404"
      }
      const result = await response.get('/sentences/inexistent-word')
      const { body, status } = result
      expect(body).toMatchObject(expectJSON)
    })
  })
  describe('#synonyms',() => {
    test("should be returns an object with synonyms info", async () => {
      const expectJSON = [
        "arguição",
        "prova",
        "exame",
        "concurso"
      ]
      const result = await response.get('/synonyms/teste')
      const { body, status } = result
      expect(body).toMatchObject(expectJSON)
    })
    test("should be returns an object with synonyms error info", async () => {
      const expectJSON = {
        "error": "Request failed with status code 404"
      }
      const result = await response.get('/synonyms/inexistent-word')
      const { body, status } = result
      expect(body).toMatchObject(expectJSON)
    })
  })
})