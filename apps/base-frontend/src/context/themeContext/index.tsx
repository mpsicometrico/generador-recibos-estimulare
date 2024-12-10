'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { ThemeProvider, createTheme } from '@mui/material'
import { PaletteMode } from '@mui/material'
import { useLocalStorage } from '@hooks/index'
import { getDesignTokens } from '@styles/index'

type ThemeState = {
  mode: PaletteMode
  toggleMode: () => void
}

type ThemeActions = 'TOGGLE_MODE'

type ThemeAction = {
  type: ThemeActions
  payload?: any
}

type ThemeContextType = {
  state: ThemeState
  toggleMode: () => void
}

const initialState: ThemeState = {
  mode: 'dark',
  toggleMode: () => undefined
}

const setSearchMethods = {
  TOGGLE_MODE: (state: ThemeState, payload: PaletteMode) => {
    return {
      ...state,
      mode: payload
    }
  }
}

const themeReducer = (state: ThemeState, action: ThemeAction) => {
  return setSearchMethods[action.type](state, action.payload)
}

const ThemeContext = React.createContext<ThemeContextType>({
  state: initialState,
  toggleMode: () => undefined
})

const CssBaseline = dynamic(() => import('@mui/material/CssBaseline'))

export const ThemeProviderCtx: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [state, dispatch] = React.useReducer(themeReducer, initialState)
  const [localTheme, setLocalTheme] = useLocalStorage('theme', 'dark')
  const { mode } = state

  const theme = React.useMemo(() => {
    const designTokens = getDesignTokens(mode)
    return createTheme(designTokens)
  }, [mode])

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setLocalTheme(newMode)
    dispatch({ type: 'TOGGLE_MODE', payload: newMode })
  }

  React.useEffect(() => {
    const initializeTheme = () => {
      if (localTheme) {
        dispatch({ type: 'TOGGLE_MODE', payload: localTheme })
      } else {
        const prefersDarkMode = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches
        const mode = prefersDarkMode ? 'dark' : 'light'
        dispatch({ type: 'TOGGLE_MODE', payload: mode })
      }
    }

    initializeTheme()
  }, [localTheme])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeContext.Provider value={{ state, toggleMode }}>
          {children}
        </ThemeContext.Provider>
      </ThemeProvider>
    </>
  )
}

export const useThemeCtx = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context
}
