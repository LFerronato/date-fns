//https://blog.rocketseat.com.br/datas-e-horarios-javascript-date-fns-moment/
import express from 'express'
import cors from 'cors'
import tz from 'date-fns-tz'
import df from 'date-fns';

let database = []
console.log(new Date());

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/', (req, resp) => {
  const { dates } = req.body
  console.log(dates);
  const newDates = dates.map(d => {
    const parsedDate = tz.toDate(d, { timeZone: 'UTC' })
    console.log(parsedDate);
    if (String(parsedDate) === 'Invalid Date') throw new Error()

    return parsedDate
  })
  database = [...database, ...newDates]

  return resp.json({ dates })
})

app.get('/', (req, resp) => {
  console.log(database);
  return resp.json({ database })
})
app.get('/isBefore', (req, resp) => {
  const result = df.isBefore(new Date('2020-01-01'), new Date())
  return resp.json({ result })
})

app.listen(3333, () => {
  console.log('server running on 3333');
})
