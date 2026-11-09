import type { User } from '../../types/user'

interface UserSeed {
  id: number
  name: string
  username: string
  email: string
  city: string
  company: string
}

function makeUser(seed: UserSeed): User {
  return {
    id: seed.id,
    name: seed.name,
    username: seed.username,
    email: seed.email,
    phone: `1-770-736-80${String(seed.id).padStart(2, '0')}`,
    website: `${seed.username.toLowerCase()}.org`,
    address: {
      street: `Street ${seed.id}`,
      suite: `Apt. ${seed.id}0${seed.id}`,
      city: seed.city,
      zipcode: `0${seed.id}000-000`,
      geo: { lat: `-23.5${seed.id}`, lng: `-46.6${seed.id}` },
    },
    company: {
      name: seed.company,
      catchPhrase: `${seed.company} catchphrase`,
      bs: `${seed.company} business`,
    },
  }
}

/**
 * 10 users, in the order the "API" returns them (not alphabetical).
 * Includes real JSONPlaceholder names and accented names, which the real API does not have.
 * - "São Paulo" and "Café & Cia" / "Açaí Tech" repeat (options without duplicates).
 * - "Mrs. Dennis Schulist" tests sorting that ignores titles.
 * - the username "qwzk" does not look like any name (search only uses `name`).
 */
export const usersFixture: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    city: 'Gwenborough',
    company: 'Romaguera-Crona',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    city: 'Wisokyburgh',
    company: 'Deckow-Crist',
  },
  {
    id: 3,
    name: 'José Araújo',
    username: 'qwzk',
    email: 'jose@example.com',
    city: 'São Paulo',
    company: 'Café & Cia',
  },
  {
    id: 4,
    name: 'Mrs. Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
    city: 'South Christy',
    company: 'Considine-Lockman',
  },
  {
    id: 5,
    name: 'Érica Gonçalves',
    username: 'ericag',
    email: 'erica@example.com',
    city: 'São Paulo',
    company: 'Açaí Tech',
  },
  {
    id: 6,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    city: 'McKenziehaven',
    company: 'Romaguera-Jacobson',
  },
  {
    id: 7,
    name: 'Ana Júlia Souza',
    username: 'anajulia',
    email: 'ana@example.com',
    city: 'Curitiba',
    company: 'Café & Cia',
  },
  {
    id: 8,
    name: 'Eduardo Lima',
    username: 'edu',
    email: 'eduardo@example.com',
    city: 'Belo Horizonte',
    company: 'Açaí Tech',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
    city: 'Bartholomebury',
    company: 'Yost and Sons',
  },
  {
    id: 10,
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
    city: 'Aliyaview',
    company: 'Abernathy Group',
  },
].map(makeUser)

/** Finds a fixture user by name. */
export function fixtureUser(name: string): User {
  const user = usersFixture.find((u) => u.name === name)
  if (!user) throw new Error(`User "${name}" is not in the fixture`)
  return user
}
