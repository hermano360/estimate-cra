// separate actions according to redux key and combine using object destructuring

const actions = {
    changePage : (page) => {
      return {
        type: 'CHANGE_PAGE',
        page
      }
    },
    changeTax : (tax) => {
      return {
        type: 'CHANGE_TAX',
        tax
      }
    },
    changeLabor : (labor) => {
      return {
        type: 'CHANGE_LABOR',
        labor
      }
    },
    changeExtraWork : (extraWork) => {
      return {
        type: 'CHANGE_EXTRA_WORK',
        extraWork
      }
    },
    changeEstimator : (estimator) => {
      return {
        type: 'CHANGE_ESTIMATOR',
        estimator
      }
    },
    loadCategories : (categories) => {
      return {
        type: 'LOAD_CATEGORIES',
        categories
      }
    },
    loadProducts : (products) => {
      return {
        type: 'LOAD_PRODUCTS',
        products
      }
    }
}

export default actions
