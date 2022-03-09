import { fromString } from "uuidv4"
import { loremIpsum } from "lorem-ipsum"
import { lorempics } from "lib/utils"

const EXAMPLE_WORKS = Array.from({ length: 20 }, (v, i) => ({
  id: fromString(`somestring${i}`),
  title: loremIpsum(),
  author: 'Mario Rossi',
  ref: 'Giulia Corona',
  description: loremIpsum({ count: 4 }),
  preview: lorempics(i + 1)
}))

export default async function handler(req, res) {
  const edition = req.query?.edition
  if(!edition || !edition.match(/^\d+$/)) return res.status(400).end('Bad Request')

  return res.status(200).send({
    works: EXAMPLE_WORKS,
    edition: {
      name: 'La Chimica raccontata dai Francobolli',
      type: 'Premio ISSA',
      number: 12,
      partecipants: EXAMPLE_WORKS.length,
      patrons: [
        {
          name: 'Città di Pozzuoli',
          image: '/imgs/pozzuoli.png'
        },
        {
          name: 'Istituto di Chimica Biomolecolare',
          image: '/imgs/icb.png'
        },
        {
          name: 'ANISN Sezione Campania',
          image: '/imgs/anisn.png'
        }
      ],
      supporters: []
    }
  })
}
