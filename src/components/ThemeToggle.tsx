import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const ThemeToggle = ({ darkMode, toggleDarkMode }: ThemeToggleProps) => {
  return (
    <motion.button
      onClick={toggleDarkMode}
      className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg transition-all ${
        darkMode
          ? 'bg-gradient-to-r from-accent-500 to-vibrant-500 text-white hover:from-accent-400 hover:to-vibrant-400 glow-cyan'
          : 'bg-gradient-to-r from-accent-500 to-vibrant-500 text-white hover:from-accent-600 hover:to-vibrant-600'
      }`}
      whileHover={{ scale: 1.15, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle dark mode"
    >
      {darkMode ? <Sun size={24} /> : <Moon size={24} />}
    </motion.button>
  )
}

export default ThemeToggle

