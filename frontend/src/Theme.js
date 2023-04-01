// Grabs user's current theme mode stored in local storage
const getThemeMode = () => {
    const themeMode = localStorage.getItem('trivinovaTheme')

    if (!themeMode) {
        localStorage.setItem('trivinovaTheme', 'light')
        return 'light'
    } else {
        return themeMode
    }
}

// Overwrites user's current theme mode and stores it in local storage 
const rewriteThemeMode = (newMode) => {
    localStorage.setItem('trivinovaTheme', newMode)
    return localStorage.getItem('trivinovaTheme')
}

export { getThemeMode, rewriteThemeMode }