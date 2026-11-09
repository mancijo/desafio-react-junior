import { fetchUsers } from '../services/usersApi'
import type { Dataset } from '../types/dataset'

/** Default data source: the users required by the challenge. */
export const usersDataset: Dataset = {
  id: 'users',
  label: 'Usuários',
  load: fetchUsers,
  text: {
    eyebrow: 'JSONPlaceholder',
    title: 'Lista de Usuários',
    intro:
      'Busque pelo nome, filtre por cidade ou empresa e clique em um usuário para ver os detalhes.',
    searchLabel: 'Buscar por nome',
    searchPlaceholder: 'Ex.: Leanne Graham',
    cityFilterLabel: 'Cidade',
    cityFilterAll: 'Todas as cidades',
    companyFilterLabel: 'Empresa',
    companyFilterAll: 'Todas as empresas',
    sortLabel: 'Ordenar por nome',
    listLabel: 'Usuários',
    loading: 'Carregando usuários',
    errorTitle: 'Não foi possível carregar os usuários.',
    emptyApi: 'Nenhum usuário cadastrado.',
    noResults: 'Nenhum usuário encontrado.',
    noResultsFor: (term) => `Nenhum usuário encontrado para "${term}".`,
    noResultsHint: 'Tente outro nome ou altere os filtros.',
    detailsEyebrow: 'Detalhes do usuário',
  },
  details: (user) => [
    { label: 'Nome completo', value: user.name },
    { label: 'Email', value: user.email },
    { label: 'Telefone', value: user.phone },
    { label: 'Empresa', value: user.company.name },
    { label: 'Cidade', value: user.address.city },
  ],
}
