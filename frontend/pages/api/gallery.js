import { fromString } from "uuidv4"
import { loremIpsum } from "lorem-ipsum"
import { lorempics } from "lib/utils"

const VIDEOS = ["https://youtube.com/watch?v=UCEWs-mKfmo","https://youtube.com/watch?v=4reO1YuvYo8","https://youtube.com/watch?v=Wk0bmHjDesM","https://youtube.com/watch?v=o6ZuQVssvYA","https://youtube.com/watch?v=GweNMxZMwG8","https://youtube.com/watch?v=T_LC2HymOOw","https://youtube.com/watch?v=0jmuNMVYHHw","https://youtube.com/watch?v=oFy-J_NDIb0","https://youtube.com/watch?v=jmFwMC5r0bs","https://youtube.com/watch?v=jOwIBsGQwMI","https://youtube.com/watch?v=E28oZjioCo4","https://youtube.com/watch?v=KRuoONI1g44","https://youtube.com/watch?v=62Dh4fLJCk4","https://youtube.com/watch?v=26pfWUFZ3kw","https://youtube.com/watch?v=XiLHV7PmUb8","https://youtube.com/watch?v=lCPZpf9YJco","https://youtube.com/watch?v=zmYb_Oqy6B8","https://youtube.com/watch?v=NNs7POHeEHc","https://youtube.com/watch?v=euOImaGZamM","https://youtube.com/watch?v=Z8oCW2qXxGU","https://youtube.com/watch?v=mlaXweSJocw","https://youtube.com/watch?v=PlS9vdFHrnM","https://youtube.com/watch?v=N72jzEs44mg","https://youtube.com/watch?v=19qso61KkcY","https://youtube.com/watch?v=1ytK1K0Mit8","https://youtube.com/watch?v=rzC06pEHbII","https://youtube.com/watch?v=2btNK7FmsJY","https://youtube.com/watch?v=j8hOZHFZ6rA","https://youtube.com/watch?v=undefined","https://youtube.com/watch?v=L0mZNFdVn8E","https://youtube.com/watch?v=undefined","https://youtube.com/watch?v=_3IrUbGqKys","https://youtube.com/watch?v=QBkglXYDrtY","https://youtube.com/watch?v=EMGW63QN_2Q","https://youtube.com/watch?v=91eGM_Q3gpc","https://youtube.com/watch?v=undefined","https://youtube.com/watch?v=undefined","https://youtube.com/watch?v=Njg_5Kz9LXo","https://youtube.com/watch?v=undefined","https://youtube.com/watch?v=undefined","https://youtube.com/watch?v=VVEs2CcsgU8","https://youtube.com/watch?v=SkPj07aetzs","https://youtube.com/watch?v=J5432Ygh1Jg","https://youtube.com/watch?v=rLPeB5GyMpI","https://youtube.com/watch?v=undefined","https://youtube.com/watch?v=undefined","https://youtube.com/watch?v=PmY1Dr2iQ_Q","https://youtube.com/watch?v=2qPvGNACjus","https://youtube.com/watch?v=gandhgG_jSI","https://youtube.com/watch?v=TtB5CryKZzc"]

const EXAMPLE_WORKS = Array.from({ length: 20 }, (v, i) => ({
  id: fromString(`somestring${i}`),
  title: loremIpsum(),
  author: 'Mario Rossi',
  school: Math.random() > 0.5 ? 'Liceo "G. Buchner"' : 'Liceo Einstein',
  ref: 'Giulia Corona',
  description: loremIpsum({ count: 4 }),
  preview: lorempics(i + 1, 480, 600, 'chemistry'),
  embed: VIDEOS[i] 
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
