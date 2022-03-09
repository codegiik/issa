import { fromString } from "uuidv4"
import { loremIpsum } from "lorem-ipsum"
import { lorempics } from "lib/utils"

const EXAMPLE_WORKS = Array.from({ length: 10 }, (v, i) => ({
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

  return res.status(200).send(EXAMPLE_WORKS)
}
