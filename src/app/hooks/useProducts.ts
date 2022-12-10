import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/store'
import { setProducts, setProductDetail } from 'app/store/slices/products'
import { Product } from 'app/@types/products'

const useProducts = () => {
  const dispatch = useDispatch()

  const { products, productDetail } = useSelector(
    (state: RootState) => state.products
  )

  return {
    products,
    productDetail,

    setProducts: (products: Product[]) => dispatch(setProducts(products)),
    setProductDetail: (product: Product) => dispatch(setProductDetail(product)),
  }
}

export default useProducts
