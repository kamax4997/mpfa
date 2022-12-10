import React from 'react'
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { Box } from '@mui/material'

interface ISimpleLikeCountProps {
  likeCount: number
}

const SimpleLikeCount: React.FC<ISimpleLikeCountProps> = ({ likeCount }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <LikeIcon fontSize="small" />
      {likeCount}
    </Box>
  )
}

export default SimpleLikeCount
