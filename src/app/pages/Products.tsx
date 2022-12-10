import React, {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
} from 'react'
import ScrollBar from 'react-perfect-scrollbar'
import {
  Menu as MenuIcon,
  NotificationsOutlined as NotificationsIcon,
  CheckOutlined as CheckIcon,
} from '@mui/icons-material'
import {
  Box,
  Tabs,
  Tab,
  Grid,
  IconButton,
  Divider,
  InputBase,
} from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { styled, alpha } from '@mui/material/styles'
import ProductItem from 'app/components/ProductItem'
import Loader from 'app/@core/Loader'
import { useAppSelector, useAppDispatch } from 'app/hooks/redux'
import {
  setProducts as setProductsAction,
  setCategories as setCategoriesAction,
} from 'app/store/slices/products'
import RestService from 'app/services/rest.service'
import { Product, Category } from 'app/@types/products'
import { RootState } from 'app/store'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  width: '60%',
  [theme.breakpoints.up('sm')]: {
    width: '60%',
  },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}))

export default function Products() {
  const [category, setCategory] = React.useState('0')
  const [isProductsFetching, setIsProductsFetching] =
    React.useState<boolean>(true)
  const [isCategoriesFetching, setIsCategoriesFetching] =
    React.useState<boolean>(true)
  const [products, setProducts] = React.useState<Product[]>([])
  const [categories, setCategories] = React.useState<Category[]>([])
  const [filterStr, setFilterStr] = React.useState('')
  const dispatch = useAppDispatch()
  const allProducts = useAppSelector(
    (state: RootState) => state.products.products
  )
  const allCategories = useAppSelector(
    (state: RootState) => state.products.categories
  )

  useEffect(() => {
    setIsProductsFetching(true)
    if (allProducts && allProducts.length > 0) {
      setIsProductsFetching(false)
      setProducts(allProducts)
    } else {
      RestService.get<{ data: Product[] }>('/items')
        .then((res: any) => {
          dispatch(setProductsAction(res.data.data))
          setProducts(res.data.data)
          setIsProductsFetching(false)
        })
        .catch(() => {
          setIsProductsFetching(false)
        })
    }
  }, [dispatch])

  useEffect(() => {
    setIsCategoriesFetching(true)
    if (allCategories && allCategories.length > 0) {
      setIsCategoriesFetching(false)
      setCategories(allCategories)
    } else {
      RestService.get<{ data: Category[] }>('/categories')
        .then((res: any) => {
          dispatch(setCategoriesAction(res.data.data))
          setCategories(res.data.data)
          setIsCategoriesFetching(false)
        })
        .catch(() => {
          setIsCategoriesFetching(false)
        })
    }
  }, [dispatch])

  const handleFilter = useCallback(
    (cat: number, fstr: string) => {
      if (allProducts !== null) {
        if (cat) {
          setProducts(
            allProducts.filter(
              (product: Product) =>
                product.category_id === cat &&
                (product.name.indexOf(fstr) !== -1 ||
                  product.description.indexOf(fstr) !== -1)
            )
          )
        } else {
          setProducts(
            allProducts.filter(
              (product: Product) =>
                product.name.indexOf(fstr) !== -1 ||
                product.description.indexOf(fstr) !== -1
            )
          )
        }
      }
    },
    [allProducts]
  )

  const handleCategoryChange = useCallback(
    (event: SyntheticEvent, newValue: string) => {
      setCategory(newValue)
      handleFilter(Number(newValue), filterStr)
    },
    [handleFilter, filterStr]
  )

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFilterStr(event.target.value)
      handleFilter(Number(category), event.target.value)
    },
    [handleFilter, category]
  )

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ m: 0 }}
        >
          <MenuIcon />
        </IconButton>
        <Search>
          <StyledInputBase
            placeholder="探索"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleSearchChange}
          />
        </Search>
        <IconButton size="large" color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton size="large" color="inherit">
          <CheckIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mt: 1, mb: 1 }} />

      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {isProductsFetching || isCategoriesFetching ? (
          <Loader />
        ) : (
          <>
            <Box>
              <Tabs
                value={category}
                onChange={handleCategoryChange}
                aria-label="wrapped label tabs example"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab value="0" label="すべて" />
                {categories.map((category: Category) => (
                  <Tab
                    value={category.id}
                    label={category.name}
                    key={category.id}
                  />
                ))}
              </Tabs>
            </Box>
            <Box
              sx={{
                height: 640,
                backgroundColor: '#e7ecf3',
              }}
            >
              <ScrollBar>
                <Grid
                  container
                  columns={{ xs: 2 }}
                  spacing={1}
                  sx={{ mt: 0, p: 1, pt: 0 }}
                >
                  {products.map((product) => (
                    <Grid item xs={1} key={product.id}>
                      <ProductItem productData={product} />
                    </Grid>
                  ))}
                </Grid>
              </ScrollBar>
            </Box>
          </>
        )}
        <IconButton
          sx={{
            display: 'grid',
            backgroundColor: '#e84f3f',
            color: 'white',
            p: 5,
            position: 'absolute',
            right: -24,
            bottom: -24,
            '&: hover': {
              backgroundColor: '#e76a5d',
            },
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          出品
          <PhotoCamera sx={{ fontSize: '4rem' }} />
        </IconButton>
      </Box>
    </Box>
  )
}
