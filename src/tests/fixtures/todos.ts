import type { Todo } from '../../types/todo'

const WORDS = [
  'delectus aut autem',
  'quis ut nam facilis',
  'fugiat veniam minus',
  'et porro tempora',
]

/**
 * 200 todos shaped like https://jsonplaceholder.typicode.com/todos:
 * 10 users with 20 todos each, 4 title families (50 each), every third one completed (66).
 */
export const todosFixture: Todo[] = Array.from({ length: 200 }, (_, index) => {
  const id = index + 1
  return {
    userId: Math.floor(index / 20) + 1,
    id,
    title: `${WORDS[index % WORDS.length]} ${id}`,
    completed: id % 3 === 0,
  }
})
