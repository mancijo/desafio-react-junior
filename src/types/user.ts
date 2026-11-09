/** Coordenadas geográficas do endereço. */
export interface Geo {
  lat: string
  lng: string
}

/** Endereço do usuário. */
export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

/** Empresa em que o usuário trabalha. */
export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

/** Usuário retornado por https://jsonplaceholder.typicode.com/users. */
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
