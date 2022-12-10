import React, { useEffect, useCallback, useState } from 'react'
import { FormattedNumber } from 'react-intl'
import ScrollBar from 'react-perfect-scrollbar'
import { useMatch, useNavigate } from 'react-router-dom'

import {
  Search as SearchIcon,
  Flag as FlagIcon,
  ArrowBackIosNewOutlined as BackIcon,
  FileUploadOutlined as UploadIcon,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Chip,
  Typography,
  Divider,
  IconButton,
} from '@mui/material'

import CommentCount from 'app/components/CommentCount'
import LikeCount from 'app/components/LikeCount'
import Loader from 'app/@core/Loader'
import { useAppSelector, useAppDispatch } from 'app/hooks/redux'
import { RootState } from 'app/store'
import { setProductDetail } from 'app/store/slices/products'
import { Product } from 'app/@types/products'
import RestService from 'app/services/rest.service'

const ProductDetail = () => {
  const match = useMatch('/products/:id')
  const [isFetching, setIsFetching] = useState(true)
  const productDetail = useAppSelector(
    (state: RootState) => state.products.productDetail
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleBack = useCallback(() => {
    navigate('/products')
  }, [navigate])

  useEffect(() => {
    if (!productDetail) {
      RestService.get<Product>(`/items/${Number(match?.params.id)}`)
        .then((res: any) => {
          dispatch(setProductDetail(res.data))
          setIsFetching(false)
        })
        .catch(() => {
          setIsFetching(false)
        })
    }
  }, [match?.params.id, dispatch])

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pl: 1,
          pr: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '77%' }}>
          <IconButton
            size="large"
            color="inherit"
            sx={{ mr: 1 }}
            onClick={handleBack}
          >
            <BackIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {productDetail?.name}
          </Typography>
        </Box>
        <Box>
          <IconButton size="large" color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton size="large" color="inherit">
            <UploadIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ height: 600, position: 'relative' }}>
        {isFetching ? (
          <Loader />
        ) : (
          <>
            <ScrollBar>
              <Box
                component="img"
                src={productDetail?.image}
                alt={productDetail?.name}
                sx={{ width: '100%' }}
              />
              <Box sx={{ pl: 2, pr: 2 }}>
                <Typography variant="subtitle1">
                  {productDetail?.name}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '55%',
                    }}
                  >
                    <LikeCount likeCount={Number(productDetail?.like_count)} />
                    <CommentCount />
                  </Box>
                  <Chip
                    icon={<FlagIcon />}
                    sx={{
                      '& .MuiChip-label': {
                        pl: 0,
                      },
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundColor: 'lightgray',
                  height: 40,
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '0 0 4px 16px',
                }}
              >
                <Typography variant="body1">商品の説明</Typography>
              </Box>
              <Box
                sx={{
                  mt: 1,
                  mb: 6,
                  pl: 2,
                  pr: 2,
                }}
              >
                {productDetail?.description}
              </Box>
            </ScrollBar>
            <Box
              sx={{
                position: 'absolute',
                height: 60,
                backgroundColor: '#3c221c',
                bottom: 0,
                mb: -2,
                width: '100%',
                pl: 1,
                pr: 1,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                }}
              >
                <Typography variant="h5" sx={{ mr: 1 }}>
                  <FormattedNumber
                    value={Number(productDetail?.price)}
                    style="currency"
                    currency="JPY"
                    maximumFractionDigits={0}
                  />
                </Typography>
                <Typography variant="body1">
                  {productDetail?.shipping_fee}
                </Typography>
              </Box>
              <Button
                sx={{
                  borderRadius: 1,
                  backgroundColor: '#d22c35',
                  '&: hover': {
                    backgroundColor: '#e76a5d',
                  },
                }}
              >
                購入手続きへ
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default ProductDetail
