const galleryItems = [
  {
    image: "/imagenes/galeria1.jpeg",
    title: "Cabina profesional",
    text: "Espacio diseñado para sesiones con calidad y comodidad."
  },
  {
    image: "/imagenes/galeria2.jpeg",
    title: "Producción creativa",
    text: "Ambiente ideal para crear, producir y desarrollar ideas."
  },
  {
    image: "/imagenes/galeria3.jpeg",
    title: "Sesiones de alto nivel",
    text: "Todo preparado para capturar el mejor sonido."
  }
]

function Gallery() {
  return (
    <section className="section" id="galeria">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Galería</span>
          <h2>Conoce el espacio</h2>
          <p>
            Un vistazo al estudio, el ambiente y la vibra de cada sesión.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <article className="gallery-card" key={item.title}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p className="muted-text">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery