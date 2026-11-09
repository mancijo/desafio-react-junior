import type { Dataset } from '../types/dataset'
import { todosDataset } from './todos'
import { usersDataset } from './users'

/** Data sources available in the switch; the first one is the default. */
export const DATASETS: Dataset[] = [usersDataset, todosDataset]

export { todosDataset, usersDataset }
