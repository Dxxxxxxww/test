const isWeekday = (t = new Date()) => t.getDay() % 6 !== 0

const isWeekend = (t = new Date()) => t.getDay() % 6 === 0

const tomorrow = () => {
  let t = new Date()
  t.setDate(t.getDate() + 1)
  return t.toISOString().split('T')[0]
}

const yesterday = () => {
  let t = new Date()
  t.setDate(t.getDate() - 1)
  return t.toISOString().split('T')[0]
}
