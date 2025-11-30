# Zaalim UI

A beautiful, customizable React UI library with built-in theme support.

## Features

- 🎨 Built-in light and dark themes
- 🎯 TypeScript support
- 🎪 Easy theme switching
- 📦 Tree-shakable components
- 🎨 Customizable color system

## Installation

```bash
npm install zaalim-ui

-----------
Quick Start
-----------
import { ThemeProvider, Button, Card, defaultTheme } from 'zaalim-ui'

function App() {
  return (
    <ThemeProvider value={defaultTheme}>
      <Button variant="primary">Click me</Button>
      <Card>
        <p>Hello from Zaalim UI!</p>
      </Card>
    </ThemeProvider>
  )
}


-------
Theming
-------
import { ThemeProvider, defaultTheme, darkTheme } from 'zaalim-ui'

// Use light theme
<ThemeProvider value={defaultTheme}>

// Use dark theme
<ThemeProvider value={darkTheme}>

// Custom theme
const customTheme = {
  colors: {
    primary: '#your-color',
    // ... other colors
  }
}
<ThemeProvider value={customTheme}>

--------
Components
----------
Button

Card, CardHeader, CardContent

More coming soon!

-------
License
-------
MIT

```
