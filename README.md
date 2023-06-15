# API DOCS 📚🔎

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ThiagoNelsi_dicio-api&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=ThiagoNelsi_dicio-api)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=ThiagoNelsi_dicio-api&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=ThiagoNelsi_dicio-api)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ThiagoNelsi_dicio-api&metric=security_rating)](https://sonarcloud.io/dashboard?id=ThiagoNelsi_dicio-api)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ThiagoNelsi_dicio-api&metric=code_smells)](https://sonarcloud.io/dashboard?id=ThiagoNelsi_dicio-api)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=ThiagoNelsi_dicio-api&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=ThiagoNelsi_dicio-api)

O Dicio API permite buscas por diversas informações a respeito de milhares de palavras da língua portuguesa, todos os dados são extraídos do [Dicio](https://dicio.com.br).

A API está atualmente na **versão 2**, em que é possível acessar os seguintes recursos:

> - SIGNIFICADOS
> - SINÔNIMOS
> - SEPARAÇÃO SILÁBICA
> - EXEMPLOS DE FRASES
> - RIMAS

<br />

### Endpoints e Responses

> ***Alerta: Rotas em português estão apenas disponíveis na versão 2.***
>
> Para utilizar a versão 2, lembre-se de adicionar o prefixo `/v2/` para todos os endpoints.
>
> Ex.:
> - /v2/[palavra]
> - /v2/sinonimos/[palavra]

#### ***Significados***

Significados podem ser acessados através do método GET em qualquer uma das seguintes rotas:
- `/[palavra]`
- `/significados/[palavra]`
- `/meanings/[palavra]`

Response:
```ts
[
  {
    partOfSpeech: string,
    meanings: string[],
    etymology: string,
  }
]
```

<br />

#### ***Sinônimos***:

Sinônimos podem ser acessados através do método GET em qualquer uma das seguintes rotas:

- `/sinonimos/[palavra]`
- `/synonyms/[palavra]`

Response:
```ts
string[]
```

<br />

#### ***Separação silábica***

A separação silábica pode ser acessada através do método GET em qualquer uma das seguintes rotas:

- `/silabas/[palavra]`
- `/syllables/[palavra]`

Response:
```ts
string[]
```

<br />

#### ***Frases***

Frases com a palavra podem ser acessada através do método GET em qualquer uma das seguintes rotas:

- `/frases/[palavra]`
- `/sentences/[palavra]`

Response:
```ts
[
  {
    sentence: string,
    author: string
  },
  {
    sentence: string,
    author: string
  }
]
```

<br />

#### ***Rimas***

As rimas podem ser acessadas através do método GET em qualquer uma das seguintes rotas:

- `/rimas/[palavra]`
- `/rhymes/[palavra]`

Response:
```ts
string[]
```

* * *

## Exemplos de uso:

Usando a palavra `livro` 📗 como exemplo, vamos começar buscando seu significado:

### Significados

https://dicio-api-ten.vercel.app/v2/livro

A resposta é um array de objetos. Cada objeto possui `partOfSpeech` (classe gramatical da palavra),
`meanings` (array de strings com os diversos sentidos que a palavra pode assumir) e `etymology` (etimologia da palavra).

```json
[
  {
    "partOfSpeech": "substantivo masculino",
    "meanings": [
      "Conjunto de folhas impressas e reunidas em volume encadernado ou brochado.",
      "Obra em prosa ou verso, de qualquer extensão, disponibilizada em qualquer meio ou suporte: livro bem escrito; livro eletrônico.",
      "Divisão menor contida numa obra maior: livro dos salmos.",
      "[Literatura] Divisão de uma obra, especialmente de uma epopeia.",
      "Caderno de registro das operações comerciais de; livro-caixa.",
      "[Figurado] Conjunto de saberes, usado como instrução, ou como fonte de ensino: livro de sabedoria."
    ],
    "etymology": "Etimologia (origem da palavra livro). Do latim liber.bri."
  }
]
```

### Palavras com múltiplas classes gramaticais

Quando uma palavra possui mais de uma classe gramatical e significados diferentes, as classes gramaticais e seus respectivos significados
são divididos em outro objeto

**Exemplo com a palavra `a`**

```json
[
  {
    "partOfSpeech": "artigo definido",
    "meanings": [
      "Artigo definido feminino de o: a bola, a casa."
    ],
    "etymology": ""
  },
  {
    "partOfSpeech": "preposição",
    "meanings": [
      "Exprime relação de movimento: ir a São Paulo.",
      "Indica tempo: partir a 20 de janeiro.",
      "Expressa um fim, objetivo, propósito: viajar a negócios.",
      "Demonstra um meio: atravessar a ponte a pé.",
      "Indica um instrumento: quebrar pedras a picareta.",
      "Estabelece uma relação de modo: andar a galope.",
      "Introduz um preço, valor: vender livros a quinze reais.",
      "[Gramática] Introduz o objeto indireto: beijar a mão a uma dama."
    ],
    "etymology": ""
  },
  {
    "partOfSpeech": "substantivo masculino",
    "meanings": [
      "Primeira letra do alfabeto e primeira das vogais.",
      "Toda representação da forma, do som ou do tipo impresso dessa letra: palavra escrita com o a aberto.",
      "[Música] Forma de representação do lá."
    ],
    "etymology": ""
  },
  ...
]
```

### Sinônimos:

https://dicio-api-ten.vercel.app/v2/sinonimos/livro

```json
[
  "alfarrábio",
  "calhamaço",
  "cartapácio"
]

```

### Separação silábica:

https://dicio-api-ten.vercel.app/v2/silabas/livro

```json
[
  "li",
  "vro"
]
```

### Exemplos de frases:

https://dicio-api-ten.vercel.app/v2/frases/livro

```json
[
  {
    "sentence": "No fim tu hás de ver que as coisas mais leves são as únicas que o vento não conseguiu levar: um estribilho antigo um carinho no momento preciso o folhear de um livro de poemas o cheiro que tinha um dia o próprio vento...",
    "author": "- Mário Quintana"
  },
  {
    "sentence": "O livro é um mestre que fala mas que não responde.",
    "author": "- Platão"
  },
  {
    "sentence": "Em 9 de setembro passado, o Tribunal Civil de Lisboa proibiu, em caráter cautelar, a venda do livro.",
    "author": "Folha de S.Paulo, 11/01/2010"
  },
  {
    "sentence": "O sucesso on-line transformou os posts em livro.",
    "author": "Folha de S.Paulo, 27/06/2009"
  },
  {
    "sentence": "Veja abaixo trecho do livro com descrição dos melhores locais para visitar na \"cidade maravilhosa\".",
    "author": "Folha de S.Paulo, 02/10/2009"
  }
]
```

### Rimas:

https://significado.herokuapp.com/v2/rimas/apologia

```json
[
  "fria",
  "luzidia",
  ...,
  "urgia",
  "alegria"
]
```
