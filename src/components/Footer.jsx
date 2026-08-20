import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-brand">
          joaquiandrade<span className="footer-brand-dot">.</span>com<span className="footer-brand-dot">.</span>ar
        </p>
        <p className="footer-note">
          © {year} Joaquina Andrade
        </p>
      </div>
    </footer>
  )
}
