const handle = {
  set: () => console.log('add'),
  get: () => console.log('get')
}

const person = new Proxy({}, handle)

person.name = 'L'
person.name
