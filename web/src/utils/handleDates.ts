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
