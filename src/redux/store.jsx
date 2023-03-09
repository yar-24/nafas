import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import productsReducer from './features/products/productSlice'
import servicesReducer from './features/services/servicesSlice'
import cartReducer from './reducer/cartRedux'

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    services: servicesReducer,
    cart: cartReducer,
  },
})

export default store;