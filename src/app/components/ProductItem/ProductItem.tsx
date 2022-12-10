import React from 'react'
import { FormattedNumber } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material'
import SimpleLikeCount from '../SimpleLikeCount'
import { Product } from 'app/@types/products'

interface IProductItemProps {
  productData: Product
}

const ProductItem: React.FC<IProductItemProps> = ({ productData }) => {
  const navigate = useNavigate()

  const handleClickProduct = React.useCallback(() => {
    navigate(`/products/${productData.id}`)
  }, [navigate, productData.id])

  return (
    <Card
      sx={{
        borderRadius: 'unset',
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={handleClickProduct}
    >
      {productData.is_sold_out ? (
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: '#e84f3f',
            color: 'white',
            padding: '50px 40px 5px 40px',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            transform: 'translate(-53px, -28px) rotate(-45deg)',
          }}
        >
          SOLD
        </Box>
      ) : null}
      <CardMedia
        component="img"
        height="200"
        image={productData.image}
        alt={productData.name}
      />
      <CardContent sx={{ padding: '10px !important' }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {productData.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              fontWeight: 'bold',
            }}
          >
            <FormattedNumber
              value={productData.price}
              style="currency"
              currency="JPY"
              maximumFractionDigits={0}
            />
          </Typography>
          {productData.like_count > 0 && (
            <SimpleLikeCount likeCount={productData.like_count} />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductItem
