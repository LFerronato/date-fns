import df from 'date-fns';

const DiferecasEntre = () => {
  const today = df.startOfDay(new Date())
  const refDate = df.startOfDay(new Date('2021-02-16'))

  const result = df.differenceInDays(refDate, today)
  console.log('result-differenceInDays:', result)
}

DiferecasEntre()
