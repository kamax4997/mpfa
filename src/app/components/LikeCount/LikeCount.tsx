import React from 'react'

import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { Box, Chip } from '@mui/material'

interface ILikeCountProps {
  likeCount: number
}

const LikeCount: React.FC<ILikeCountProps> = ({ likeCount }) => {
  return (
    <Box>
      <Chip sx={{ paddingLeft: '5px' }} icon={<LikeIcon />} label="いいね!" />
      {likeCount}
    </Box>
  )
}

export default LikeCount
