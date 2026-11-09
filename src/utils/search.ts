import Fuse from 'fuse.js'
import type { User } from '../types/user'
import { normalizeText } from './text'

/** A partir deste tamanho, o termo também usa a busca aproximada. */
const FUZZY_MIN_LENGTH = 3

/**
 * Tolerância da busca aproximada (0 = só exato, 1 = qualquer coisa).
 * Rígida de propósito: o trecho exato sempre entra no resultado, então o Fuse.js
 * só precisa cobrir pequenos erros de digitação.
 */
const FUZZY_THRESHOLD = 0.3

/**
 * Filtra usuários pelo nome (`name`), ignorando maiúsculas/minúsculas e acentos.
 * - Termo vazio: todos os usuários.
 * - 1–2 letras: só nomes que contêm o trecho exato.
 * - 3+ letras: nomes com o trecho exato **mais** as correspondências aproximadas do Fuse.js.
 * A ordem original dos usuários é preservada (a ordenação é aplicada depois).
 */
export function searchUsersByName(users: User[], term: string): User[] {
  const query = normalizeText(term)
  if (query === '') return users

  const exactIds = new Set(
    users.filter((user) => normalizeText(user.name).includes(query)).map((user) => user.id),
  )

  if (query.length < FUZZY_MIN_LENGTH) {
    return users.filter((user) => exactIds.has(user.id))
  }

  const fuse = new Fuse(users, {
    keys: ['name'],
    getFn: (user) => normalizeText(user.name),
    threshold: FUZZY_THRESHOLD,
    ignoreLocation: true,
  })
  const fuzzyIds = new Set(fuse.search(query).map((result) => result.item.id))

  return users.filter((user) => exactIds.has(user.id) || fuzzyIds.has(user.id))
}
