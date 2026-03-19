function Hero() {
  return (
    <section className="hero-section" id="inicio">
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="eyebrow">Estudio premium para artistas</span>

          <h1>
            LaFacultad
            <br />
            Studio
          </h1>

          <p>
            Reserva tu sesión, elige tus horarios y graba en un estudio
            profesional diseñado para artistas que buscan un sonido de alto nivel.
          </p>

          <div className="hero-buttons">
            <a href="#agenda" className="btn-primary">
              Agendar sesión
            </a>
            <a href="#galeria" className="btn-secondary">
              Ver galería
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="video-hero">
            <video controls loop playsInline muted className="hero-video">
              <source src="/imagenes/video1.mp4" type="video/mp4" />
              Tu navegador no soporta video HTML5.
            </video>

            <div className="video-overlay">
              <span className="live-dot"></span>
              <strong>Sesiones en vivo</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero