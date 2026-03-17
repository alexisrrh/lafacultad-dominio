import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'lafacultad_bookings'

const timeSlots = [
  '10:00–12:00',
  '12:00–14:00',
  '14:00–16:00',
  '16:00–18:00',
  '18:00–20:00'
]

function loadBookings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function BookingForm() {
  const [bookings, setBookings] = useState(loadBookings)
  const [selectedSlots, setSelectedSlots] = useState([])
  const [form, setForm] = useState({
    artistName: '',
    realName: '',
    email: '',
    phone: '',
    date: '',
    sessionType: '',
    notes: ''
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  }, [bookings])

  useEffect(() => {
    setSelectedSlots([])
  }, [form.date])

  const bookedSlots = useMemo(() => {
    return bookings
      .filter((booking) => booking.date === form.date)
      .flatMap((booking) => booking.slots)
  }, [bookings, form.date])

  function toggleSlot(slot) {
    if (!form.date) {
      setMessage('Primero selecciona una fecha.')
      return
    }

    if (bookedSlots.includes(slot)) return

    setMessage('')
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((item) => item !== slot) : [...prev, slot]
    )
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (
      !form.artistName ||
      !form.realName ||
      !form.email ||
      !form.phone ||
      !form.date ||
      !form.sessionType ||
      selectedSlots.length === 0
    ) {
      setMessage('Completa todos los campos y selecciona al menos un bloque.')
      return
    }

    const newBooking = {
      id: crypto.randomUUID(),
      ...form,
      slots: selectedSlots,
      createdAt: new Date().toISOString()
    }

    setBookings((prev) => [newBooking, ...prev])
    setForm({
      artistName: '',
      realName: '',
      email: '',
      phone: '',
      date: '',
      sessionType: '',
      notes: ''
    })
    setSelectedSlots([])
    setMessage('Solicitud enviada correctamente.')
  }

  return (
    <section className="section" id="agenda">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Agenda</span>
          <h2>Reserva tu sesión</h2>
          <p>
            Regístrate como artista, elige tu fecha y selecciona los bloques de
            horas que necesitas.
          </p>
        </div>

        <div className="booking-grid">
          <article className="card booking-card">
            <h3>Registro del artista</h3>

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Nombre artístico"
                  value={form.artistName}
                  onChange={(e) =>
                    setForm({ ...form, artistName: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Nombre real"
                  value={form.realName}
                  onChange={(e) => setForm({ ...form, realName: e.target.value })}
                />
              </div>

              <div className="form-row">
                <input
                  type="email"
                  placeholder="Correo"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Teléfono / WhatsApp"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div id="tipoDeSesion" className="form-row">
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
                <select 
                  value={form.sessionType}
                  onChange={(e) =>
                    setForm({ ...form, sessionType: e.target.value })
                  }
                >
                  <option value="">Tipo de sesión</option>
                  <option value="Grabación vocal">Grabación vocal</option>
                  <option value="Producción">Producción</option>
                  <option value="Mezcla">Mezcla</option>
                  <option value="Mastering">Mastering</option>
                  <option value="Sesión completa">Sesión completa</option>
                </select>
              </div>

              <textarea
                placeholder="Notas adicionales"
                rows="4"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />

              <div className="summary-box">
                <strong>Bloques seleccionados</strong>
                <div className="selected-slots">
                  {selectedSlots.length === 0 ? (
                    <span className="muted-text">No has seleccionado horarios.</span>
                  ) : (
                    selectedSlots.map((slot) => (
                      <span className="slot-pill active" key={slot}>
                        {slot}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {message && <div className="form-message">{message}</div>}

              <button type="submit" className="primary-btn full">
                Enviar solicitud
              </button>
            </form>
          </article>

          <article className="card booking-card">
            <h3>Bloques disponibles</h3>
            <p className="muted-text">
              Selecciona uno o varios bloques. Los horarios ocupados se bloquean
              por fecha.
            </p>

            <div className="slots-grid">
              {timeSlots.map((slot) => {
                const isBooked = bookedSlots.includes(slot)
                const isSelected = selectedSlots.includes(slot)

                return (
                  <button
                    type="button"
                    key={slot}
                    className={`slot-pill ${isSelected ? 'active' : ''} ${
                      isBooked ? 'booked' : ''
                    }`}
                    onClick={() => toggleSlot(slot)}
                    disabled={isBooked}
                  >
                    <strong>{slot}</strong>
                    <small>{isBooked ? 'Reservado' : 'Disponible'}</small>
                  </button>
                )
              })}
            </div>

            <div className="recent-box">
              <h4>Solicitudes recientes</h4>
              <div className="recent-list">
                {bookings.length === 0 ? (
                  <p className="muted-text">Aún no hay reservas guardadas.</p>
                ) : (
                  bookings.slice(0, 4).map((booking) => (
                    <div className="recent-item" key={booking.id}>
                      <strong>{booking.artistName}</strong>
                      <span>
                        {booking.sessionType} · {booking.date}
                      </span>
                      <small>{booking.slots.join(', ')}</small>
                    </div>
                  ))
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default BookingForm