import React from 'react'

import CommentIcon from '@mui/icons-material/CommentOutlined'
import { Chip } from '@mui/material'

const CommentCount = () => {
  return (
    <Chip sx={{ paddingLeft: '5px' }} icon={<CommentIcon />} label="コメント" />
  )
}

export default CommentCount
