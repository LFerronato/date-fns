import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios'
import { formatToUTC, formatToLocal } from './utils/handleDates';

import { add, format, formatISO, getDay, isSaturday } from 'date-fns'
import { toDate, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

function App() {
  const [datesBody, setDates] = useState([''])
  const [selectedDate, setSelectedDate] = useState('2020-10-10T00:00')

  useEffect(() => {
    api.get<{ database: string[] }>('/')
      .then(resp => {
        const receivedDatas = resp.data.database

        const nova = receivedDatas.map((r: string) => {
          console.log(r, ' | ', formatToLocal(r))
          const n = formatToLocal(r)
          return n
        })
        setDates(nova)
      })
  }, [selectedDate])

  const handleSubmit = useCallback(() => {
    console.log(selectedDate, '||', formatToUTC(selectedDate));
    api.post('/', {
      dates: [formatToUTC(selectedDate)]
    })
      .then(resp => console.log(resp.status))
  }, [selectedDate])

  const handleFillClasses = useCallback(() => {
    console.clear()
    const firstClass = '2020-11-21'

    console.log('@@ firstClass:', firstClass)
    console.log('tz-zonedTimeToUtc:', zonedTimeToUtc(firstClass, 'UTC'))
    console.log('tz-utcToZonedTime:', utcToZonedTime(firstClass, 'UTC'))
    console.log('tz-toDate:', toDate(firstClass))
    console.log('tz-toDate-UTC:', toDate(firstClass, { timeZone: 'UTC' }))
    console.log('-')
    console.log('getDay', getDay(toDate(firstClass)))
    console.log('format', format(toDate(firstClass), 'dd'))
    console.log('isSaturday', isSaturday(toDate(firstClass)))

    formatISO(add(toDate(firstClass), { days: 7 }), {
      representation: 'date',
    })
  }, [])

  return (
    <div className="App">
      <h2>retorno</h2>
      <div>
        {datesBody.map((date, i) => (
          <p key={i}>{(date)}</p>
        ))}
      </div>
      <input
        type="datetime-local"

        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)} />
      <button onClick={handleSubmit} >Cadastrar</button>
      <button onClick={handleFillClasses} >Outro Exemplo (log)</button>
    </div>
  );
}

export default App;
