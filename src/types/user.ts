/** Geographic coordinates of the address. */
export interface Geo {
  lat: string
  lng: string
}

/** User address. */
export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

/** Company the user works for. */
export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

/** User returned by https://jsonplaceholder.typicode.com/users. */
export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: Address
  company: Company
}
