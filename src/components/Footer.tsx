interface FooterProps {
  darkMode: boolean
}

const Footer = ({ darkMode }: FooterProps) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={`py-8 border-t ${
        darkMode
          ? 'bg-primary-900 border-primary-700/30'
          : 'bg-white border-primary-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className={`text-sm ${
              darkMode ? 'text-primary-200' : 'text-primary-600'
            }`}
          >
            © {currentYear} Muhammad Bilal Faisal. All rights reserved.
          </p>
          <p
            className={`text-sm ${
              darkMode ? 'text-primary-300' : 'text-primary-500'
            }`}
          >
            AI Engineer & Full-Stack Developer
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

