import { useEffect, useMemo, useState } from "react"
import { supabase } from "../lib/supabase"

const timeSlots = [
  "10:00–12:00",
  "12:00–14:00",
  "14:00–16:00",
  "16:00–18:00",
  "18:00–20:00"
]

function BookingForm() {
  const [bookedSlotRows, setBookedSlotRows] = useState([])
  const [selectedSlots, setSelectedSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const [form, setForm] = useState({
    artistName: "",
    realName: "",
    email: "",
    phone: "",
    date: "",
    sessionType: "",
    notes: ""
  })

  useEffect(() => {
    fetchBookedSlots()
  }, [])

  useEffect(() => {
    setSelectedSlots([])
    if (form.date) {
      fetchBookedSlots(form.date)
    }
  }, [form.date])

  async function fetchBookedSlots(selectedDate) {
    let query = supabase
      .from("booking_slots")
      .select("*")
      .order("created_at", { ascending: false })

    if (selectedDate) {
      query = query.eq("date", selectedDate)
    }

    const { data, error } = await query

    if (error) {
      console.log("Error cargando bloques:", error)
      return
    }

    setBookedSlotRows(data || [])
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
    setMessage("")
  }

  const bookedSlots = useMemo(() => {
    return bookedSlotRows
      .filter((item) => item.date === form.date)
      .map((item) => item.slot)
  }, [bookedSlotRows, form.date])

  function toggleSlot(slot) {
    if (!form.date) {
      setMessage("Primero selecciona una fecha.")
      return
    }

    if (bookedSlots.includes(slot)) return

    setMessage("")
    setSelectedSlots((prev) =>
      prev.includes(slot)
        ? prev.filter((item) => item !== slot)
        : [...prev, slot]
    )
  }

  async function handleSubmit(e) {
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
      setMessage("Completa todos los campos y selecciona al menos un bloque.")
      return
    }

    const alreadyBooked = selectedSlots.some((slot) =>
      bookedSlots.includes(slot)
    )

    if (alreadyBooked) {
      setMessage("Uno de los bloques seleccionados ya no está disponible.")
      return
    }

    setLoading(true)
    setMessage("")

    const { data: bookingData, error: bookingError } = await supabase
      .from("bookings")
      .insert([
        {
          artist_name: form.artistName,
          real_name: form.realName,
          email: form.email,
          phone: form.phone,
          date: form.date,
          session_type: form.sessionType,
          notas: form.notes
        }
      ])
      .select()
      .single()

    if (bookingError) {
      console.log("Error guardando reserva:", bookingError)
      setMessage("Error al guardar la reserva.")
      setLoading(false)
      return
    }

    const slotRows = selectedSlots.map((slot) => ({
      booking_id: bookingData.id,
      date: form.date,
      slot
    }))

    const { error: slotsError } = await supabase
      .from("booking_slots")
      .insert(slotRows)

    if (slotsError) {
      console.log("Error guardando bloques:", slotsError)

      await supabase.from("bookings").delete().eq("id", bookingData.id)

      setMessage("Uno de los horarios ya fue reservado. Intenta con otro.")
      setLoading(false)
      fetchBookedSlots(form.date)
      return
    }

    setForm({
      artistName: "",
      realName: "",
      email: "",
      phone: "",
      date: "",
      sessionType: "",
      notes: ""
    })

    setSelectedSlots([])
    setMessage("Solicitud enviada correctamente.")
    setLoading(false)

    fetchBookedSlots()
  }

  return (
    <section className="section" id="agenda">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Agenda</span>
          <h2>Reserva tu sesión</h2>
          <p>
            Regístrate como artista, elige tu fecha y selecciona los bloques
            de horas que necesitas.
          </p>
        </div>

        <div className="booking-grid">
          <article className="card booking-card">
            <h3>Registro del artista</h3>

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  name="artistName"
                  type="text"
                  placeholder="Nombre artístico"
                  value={form.artistName}
                  onChange={handleChange}
                />
                <input
                  name="realName"
                  type="text"
                  placeholder="Nombre real"
                  value={form.realName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <input
                  name="email"
                  type="email"
                  placeholder="Correo"
                  value={form.email}
                  onChange={handleChange}
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Teléfono / WhatsApp"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <input
                  name="date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.date}
                  onChange={handleChange}
                />

                <select
                  name="sessionType"
                  value={form.sessionType}
                  onChange={handleChange}
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
                name="notes"
                rows="4"
                placeholder="Notas adicionales"
                value={form.notes}
                onChange={handleChange}
              />

              <div className="summary-box">
                <strong>Bloques seleccionados</strong>
                <div className="selected-slots">
                  {selectedSlots.length === 0 ? (
                    <span className="muted-text">
                      No has seleccionado horarios.
                    </span>
                  ) : (
                    selectedSlots.map((slot) => (
                      <span key={slot} className="slot-pill active">
                        {slot}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {message && <div className="form-message">{message}</div>}

              <button
                type="submit"
                className="primary-btn full"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar solicitud"}
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
                    key={slot}
                    type="button"
                    className={`slot-pill ${isSelected ? "active" : ""} ${isBooked ? "booked" : ""}`}
                    onClick={() => toggleSlot(slot)}
                    disabled={isBooked}
                  >
                    <strong>{slot}</strong>
                    <small>{isBooked ? "Reservado" : "Disponible"}</small>
                  </button>
                )
              })}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default BookingForm