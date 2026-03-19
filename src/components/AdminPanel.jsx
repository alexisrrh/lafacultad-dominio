import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

function AdminPanel() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    fetchBookings()
  }, [])

  async function fetchBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) setBookings(data)
  }

  async function cancelBooking(id) {
    await supabase.from("booking_slots").delete().eq("booking_id", id)
    await supabase.from("bookings").delete().eq("id", id)

    fetchBookings()
  }

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <div style={{ padding: "60px", color: "white" }}>
      <h2>Panel Admin</h2>

      <button onClick={logout}>Cerrar sesión</button>

      <hr />

      {bookings.length === 0 ? (
        <p>No hay reservas.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            style={{
              border: "1px solid white",
              padding: "20px",
              marginBottom: "20px"
            }}
          >
            <p><strong>Artista:</strong> {booking.artist_name}</p>
            <p><strong>Nombre real:</strong> {booking.real_name}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Teléfono:</strong> {booking.phone}</p>
            <p><strong>Fecha:</strong> {booking.date}</p>
            <p><strong>Tipo:</strong> {booking.session_type}</p>
            <p><strong>Notas:</strong> {booking.notas}</p>

            <button onClick={() => cancelBooking(booking.id)}>
              Cancelar reserva
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default AdminPanel