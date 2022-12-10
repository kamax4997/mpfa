import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Paper } from '@mui/material'

export default function Layout() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Paper
        sx={{
          m: 5,
          pt: 1,
          width: 450,
          borderRadius: 0,
        }}
      >
        <Outlet />
      </Paper>
    </Box>
  )
}
