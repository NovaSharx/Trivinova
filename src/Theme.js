const getThemeMode = () => {
    const themeMode = localStorage.getItem('trivinovaTheme')

    if (!themeMode) {
        localStorage.setItem('trivinovaTheme', 'light')
        return 'light'
    } else {
        return themeMode
    }
}

const rewriteThemeMode = (newMode) => {
    localStorage.setItem('trivinovaTheme', newMode)
    return localStorage.getItem('trivinovaTheme')
}

export { getThemeMode, rewriteThemeMode }