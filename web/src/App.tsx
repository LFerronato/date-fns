import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios'
import { formatToUTC, formatToLocal } from './utils/handleDates';

const api = axios.create({
  baseURL: 'http://157.245.4.66:3339'
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
    </div>
  );
}

export default App;
