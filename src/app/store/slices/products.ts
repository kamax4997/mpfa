import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, Product } from 'app/@types/products'
import { RootState } from 'app/store'

export interface IInitialState {
  products: Product[] | null
  categories: Category[] | null
  productDetail: Product | null
}

const initialState: IInitialState = {
  products: [],
  categories: [],
  productDetail: null,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload
    },

    setProductDetail(state, action: PayloadAction<Product>) {
      state.productDetail = action.payload
    },

    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload
    },
  },
})

export const { setProducts, setProductDetail, setCategories } =
  productsSlice.actions

export const products = (state: RootState) => state.products

export default productsSlice.reducer
