import df from 'date-fns';

const start_endOfWeek = () => {
  const today = df.startOfDay(new Date())

  const result11 = df.startOfWeek(df.sub(today, { weeks: 1 }))
  const result12 = df.endOfWeek(df.sub(today, { weeks: 1 }))

  const result21 = df.startOfWeek(today)
  const result22 = df.endOfWeek(today)

  console.log('result11-Inicio Semana Passado:', result11)
  console.log('result12-Fim Semana Passado:', result12)
  console.log('result21-Inicio Desta Semana:', result21)
  console.log('result22-Fim Desta Semana:', result22)
}

start_endOfWeek()
