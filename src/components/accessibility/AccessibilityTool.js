import * as Mui from '@mui/material'

import { useTheme } from '@mui/material/styles'

import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

export default function AccessibilityTool({ setThemeMode }) {

    const theme = useTheme()

    const toggleThemeMode = () => {
        if (theme.palette.mode === 'light') {
          setThemeMode('dark')
        } else {
          setThemeMode('light')
        }
      }

    return (
        <Mui.Box>
            <Mui.SpeedDial
                ariaLabel='Accessibility Tool'
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<AccessibilityNewIcon />}
            >
                <Mui.SpeedDialAction
                    key={0}
                    icon={theme.palette.mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                    tooltipTitle={theme.palette.mode === 'light' ? 'Toggle Dark Mode' : 'Toggle Light Mode'}
                    onClick={() => toggleThemeMode()}
                />
            </Mui.SpeedDial>
        </Mui.Box>
    )
}