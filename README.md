# DOCS

### Response Params

#### meanings:  
```
[
  {
    class: String,
    meanings: [String],
    etymology: String,
  }
]
```

#### synonyms:
```
[
'synonym1',
'synonym2',
...
]
```
#### syllables:
```
{
  syllablesText: String,
  syllablesCount: Number
}
```

#### Usando a palavra `livro` como exemplo:

### Request URL

Para significados:  
https://significado.herokuapp.com/meanings/livro  
ou simplesmente:
https://significado.herokuapp.com/livro

Outras informações:  
sinônimos: https://significado.herokuapp.com/synonyms/livro  
separação silábica: https://significado.herokuapp.com/syllables/livro

### Response

A resposta é um Array de objetos. Cada objeto possui uma `class` (classe gramatical da palavra),
`meanings` (os significados da palavra) e `etymology` (etimologia da palavra)

```
[
  {
    "class": "substantivo masculino",
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

Quando uma palavra tem mais de uma classe gramatical e significados diferentes, as classes gramaticais e seus respectivos significados 
são divididos em outro objeto

**Exemplo com a palavra `auto`**

```
[
  {
    "class": "substantivo masculino",
    "meanings": [
      "Festividade pública; solenidade.",
      "[Jurídico] Documento escrito, termo ou registro, que narra detalhadamente uma diligência policial, servindo de prova ou evidência de uma ocorrência.",
      "[Teatro]  Peça teatral em forma poética, de origem medieval, que focaliza temas religiosos e profanos, de criação essencialmente popular, apresenta uma linguagem que integra vocabulário e expressões consagradas pelo povo."
    ],
    "etymology": ""
  },
  {
    "class": "substantivo masculino plural",
    "meanings": [
      "[Jurídico] Os documentos ou registros produzidos no desenrolar de um processo: petições, certidões e os registros de depoimentos foram anexados aos autos."
    ],
    "etymology": "Etimologia (origem da palavra auto). Do latim actum.i."
  },
  {
    "class": "substantivo masculino",
    "meanings": [
      "Veículo movido a motor; automóvel."
    ],
    "etymology": "Etimologia (origem da palavra auto). Forma Red. de automóvel."
  },
  {
    "class": "substantivo masculino",
    "meanings": [
      "Breve momento; instante."
    ],
    "etymology": "Etimologia (origem da palavra auto). De átomo."
  }
]
```
