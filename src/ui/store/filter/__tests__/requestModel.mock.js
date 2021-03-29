import FilterParams from '../requestModel'
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

export const mockEmptyFiltersData = () => {
  return {
    oid: null,
    classifier: null,
    classifier_version: null,
    class: null,
    ranking: 1,
    ndet: [],
    probability: null,
    firstmjd: [],
    lastmjd: [],
    ra: null,
    dec: null,
    radius: null,
    page: 1,
    page_size: 1,
    count: 'true',
    order_by: null,
    order_mode: null,
  }
}

export const mockFilters = () => new FilterParams(mockFiltersData())
export const mockEmptyFilters = () => new FilterParams()
