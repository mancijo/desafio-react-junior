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
      street: `Rua ${seed.id}`,
      suite: `Apto. ${seed.id}0${seed.id}`,
      city: seed.city,
      zipcode: `0${seed.id}000-000`,
      geo: { lat: `-23.5${seed.id}`, lng: `-46.6${seed.id}` },
    },
    company: {
      name: seed.company,
      catchPhrase: `Slogan da ${seed.company}`,
      bs: `ramo da ${seed.company}`,
    },
  }
}

/**
 * 10 usuários, na ordem em que a "API" os devolve (fora de ordem alfabética).
 * Inclui nomes reais do JSONPlaceholder e nomes acentuados, que a API real não tem.
 * - "São Paulo" e "Café & Cia" / "Açaí Tech" se repetem (opções sem duplicatas).
 * - "Mrs. Dennis Schulist" testa a ordenação que ignora títulos.
 * - o username "qwzk" não se parece com nenhum nome (busca só por `name`).
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
    email: 'jose@exemplo.com.br',
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
    email: 'erica@exemplo.com.br',
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
    email: 'ana@exemplo.com.br',
    city: 'Curitiba',
    company: 'Café & Cia',
  },
  {
    id: 8,
    name: 'Eduardo Lima',
    username: 'edu',
    email: 'eduardo@exemplo.com.br',
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

/** Busca um usuário da fixture pelo nome. */
export function fixtureUser(name: string): User {
  const user = usersFixture.find((u) => u.name === name)
  if (!user) throw new Error(`Usuário "${name}" não existe na fixture`)
  return user
}
