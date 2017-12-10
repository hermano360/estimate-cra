export const PageReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return action.page
    default:
      return state
  }
}

export const TaxReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_TAX':
      return action.tax
    default:
      return state
  }
}

export const LaborReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_LABOR':
      return action.labor
    default:
      return state
  }
}

export const ExtraWorkReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_EXTRA_WORK':
      return action.extraWork
    default:
      return state
  }
}

export const EstimatorReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_ESTIMATOR':
      return action.estimator
    default:
      return state
  }
}

export const CategoriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_CATEGORIES':
      return action.categories
    default:
      return state
  }
}

export const ProductsReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_PRODUCTS':
      return action.products
    default:
      return state
  }
}
