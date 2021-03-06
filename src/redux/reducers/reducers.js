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

export const QuotesReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_QUOTES':
      return action.quotes
    case 'ADD_TO_SHOPPING_CART':
      // starting with default quantity of 0
      let emptyShoppingCart = action.shoppingCart.map((item)=>{
        return {
          ...item,
          quantity: 0,
          template: action.template
        }
      })
      return {
        ...state,
        [action.quoteNumber]: {
          ...state[action.quoteNumber],
          shoppingCart: [
            ...state[action.quoteNumber].shoppingCart,
            ...emptyShoppingCart
          ]
        }
      }
    case 'REMOVE_FROM_SHOPPING_CART':
      let updatedShoppingCart = [...state[action.quoteNumber].shoppingCart]
      updatedShoppingCart.splice(action.itemNumber-1, 1)

      return {
        ...state,
        [action.quoteNumber]: {
          ...state[action.quoteNumber],
          shoppingCart: updatedShoppingCart
        }
      }
    case 'UPDATE_ITEM_QUANTITY':

      let newShoppingCart = [...state[action.quoteNumber].shoppingCart]
      newShoppingCart[action.itemNumber-1] = {
        ...newShoppingCart[action.itemNumber-1],
        quantity: action.quantity
      }

      return {
        ...state,
        [action.quoteNumber]: {
          ...state[action.quoteNumber],
          shoppingCart: newShoppingCart
        }
      }
    case "EDIT_QUOTE_ATTRIBUTE":
      return {
        ...state,
        [action.quoteNumber]: {
          ...state[action.quoteNumber],
          [action.attribute] : action.value
        }
      }
    default:
      return state
  }
}

export const QuoteNumberReducer = (state = 1, action) => {
  switch (action.type) {
    case 'SET_QUOTE_NUMBER':
      return action.quoteNumber
    default:
      return state
  }
}
