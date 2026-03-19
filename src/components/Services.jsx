const services = [
  {
    icon: "🎙",
    title: "Grabación vocal",
    text: "Sesiones para artistas, demos, sencillos y proyectos completos con enfoque profesional."
  },
  {
    icon: "🎛",
    title: "Producción musical",
    text: "Desarrollo creativo, estructura, arreglos y dirección para llevar una idea a otro nivel."
  },
  {
    icon: "🎚",
    title: "Mezcla",
    text: "Claridad, balance y pegada para que cada tema suene limpio y competitivo."
  },
  {
    icon: "💿",
    title: "Mastering",
    text: "Pulido final para que tu música tenga presencia, volumen y consistencia."
  }
]

function Services() {
  return (
    <section className="section" id="servicios">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Servicios</span>
          <h2>Todo lo que necesitas para tu sesión</h2>
          <p>
            Un estudio pensado para artistas que quieren trabajar con orden,
            vibra y calidad.
          </p>
        </div>

        <div className="cards-grid">
          {services.map((service) => (
            <article className="card service-card" key={service.title}>
             <div className="card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services