import FilterParams from './filter'
export const mockFiltersData = () => {
  return {
    oid: ['Oid1', 'Oid2'],
    classifier: 'classifier_name',
    classifier_version: 'classifier_version',
    class: 'class_name',
    ranking: 1,
    ndet: [200],
    probability: 0.5,
    firstmjd: [59250, 59300],
    lastmjd: [],
    ra: 100,
    dec: 100,
    radius: 30,
    page: 1,
    page_size: 10,
    count: 'true',
    order_by: 'ndet',
    order_mode: 'ASC',
  }
}

export const mockFilters = () => new FilterParams(mockFiltersData())
