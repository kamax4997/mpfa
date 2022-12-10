import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import ProductItem from '../ProductItem'
import { BrowserRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

const mockProduct = {
  category_id: 2,
  comment_count: 59,
  description:
    'In good condition with signs of wear, may just need to be cleaned or washed.',
  id: 1,
  image: 'https://merpay-api.herokuapp.com/images/image_1.png',
  is_sold_out: true,
  like_count: 91,
  name: 'Light pink shoes',
  price: 51,
  shipping_fee: '送料込み',
}

describe('ProductItem component', () => {
  beforeEach(() => {
    render(
      <IntlProvider locale="en">
        <BrowserRouter>
          <ProductItem productData={mockProduct} />
        </BrowserRouter>
      </IntlProvider>
    )
  })

  afterEach(cleanup)

  it('should render without crashing', () => {
    expect(screen.getByAltText(/Light pink shoes/i)).toBeTruthy()
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByText(91)).toBeInTheDocument()
  })

  it('should show sold ribbon if the item is sold out', () => {
    expect(screen.getByText(/SOLD/i)).toBeTruthy()
  })
})
