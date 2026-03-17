function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">

        {/* Logo + Nombre */}
        <a href="#inicio" className="brand">
          <img
  src="/imagenes/logo.jpeg"
  alt="LaFacultad Studio"
  className="logo-img"
          />
          <div className="brand-text">
      
            <span>Grabación • Producción • Agenda</span>
          </div>
        </a>

        {/* Links */}
        <nav className="nav-links">
          <a href="#servicios">Servicios</a>
          <a href="#galeria">Galería</a>
          <a href="#agenda" className="nav-cta">
            Agendar sesión
          </a>
        </nav>

      </div>
    </header>
  )
}

export default Navbar