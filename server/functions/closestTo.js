import df from 'date-fns';

const FeriadosDeSaoPaulo = [
  new Date('2021-01-01'),
  new Date('2021-01-25'),
  new Date('2021-02-15'),
  new Date('2021-02-16'),
  new Date('2021-04-02'),
  new Date('2021-04-21'),
  new Date('2021-06-03'),
  new Date('2021-07-09'),
  new Date('2021-09-07'),
  new Date('2021-10-12'),
  new Date('2021-11-02'),
  new Date('2021-11-15'),
  new Date('2021-12-24'),
  new Date('2021-12-31'),
]

const jobGoodMorning10AM = () => {
  const today = df.startOfDay(new Date())
  const result = df.closestTo(today, FeriadosDeSaoPaulo)
  console.log('result-closestTo:', result)

  console.log('today: ', today)
  console.log('result-isToday:', df.isToday(result))
}

jobGoodMorning10AM()
