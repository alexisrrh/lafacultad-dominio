const galleryItems = [
  {
    image:
      '/imagenes/estudio3.jpeg',
    title: 'Sesiones en cabina'
  },
  {
    image:
      '/imagenes/estudio1.jpeg',
    title: 'Producción musical'
  },
  {
    image:
      '/imagenes/estudio4.jpeg',
    title: 'Artistas grabando'
  }
]

function Gallery() {
  return (
    <section className="section" id="galeria">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Galería</span>
          <h2>Ambiente real de estudio</h2>
          <p>
            Una estética moderna, oscura y profesional para crear con enfoque.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <article className="gallery-card" key={item.title}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery