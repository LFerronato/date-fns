<p align="center">
  <a href="https://date-fns.org/">
    <img alt="date-fns" title="date-fns" src="https://raw.githubusercontent.com/date-fns/date-fns/master/docs/logotype.svg" width="300" />
  </a>
</p>

<p align="center">
  Sample of server (express) and web (reactjs)
  <br>
  using <b>date-fns</b> library
  <br>
  <a href="https://date-fns.org/">date-fns.org</a>
</p>

</div>

<hr>
  <br>

- **Server** just working with UTC.
- **Front-end** read dates in local time.
  <br>  <br>
## Create utils custom functions to Front-end
#### <a href="https://raw.githubusercontent.com/LFerronato/date-fns/web/src/utils/handleDates.ts">(.web\src\utils\handleDates.ts)</a>
<br>

```js
import { format, parseISO, addMinutes, subMinutes } from 'date-fns'

export function formatToLocal(date: string) {
  return format(parseISO(date), 'yyyy-MM-dd HH:mm:ss')
}

export function dateLocalToUTC(date: Date) {
  var offset = date.getTimezoneOffset()
  return Math.sign(offset) !== -1 ? addMinutes(date, offset) : subMinutes(date, Math.abs(offset))
}

/**
 * Normaly used to send date to server
 * return: yyyy-MM-dd hh:mm:ss (UTC)
 * */
export function formatToUTC(date: string) {
  return format(dateLocalToUTC(parseISO(date)), 'yyyy-MM-dd hh:mm:ss')
}

```

```js
app.post('/', (req, resp) => {
  const { dates } = req.body
  
  const newDates = dates.map(d => {
    const parsedDate = fns.parseISO(d)
    if (String(parsedDate) === 'Invalid Date') throw new Error()

    return parsedDate
  })

  return resp.json({ newDates })
})
```