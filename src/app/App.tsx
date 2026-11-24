import { useAuth } from '@/modules/auth/hooks/useAuth'
import { AuthPage } from '@/modules/auth/components/AuthPage'
import { CreateOrganizationPage } from '@/modules/organizations/components/CreateOrganizationPage'
import { authService } from '@/modules/auth/auth.service'

export function App() {
  const { session, loading, refresh } = useAuth()

  if (loading) return <p style={{ textAlign: 'center', marginTop: 80 }}>Cargando...</p>

  if (!session) return <AuthPage />

  if (!session.membership) {
    return <CreateOrganizationPage onCreated={refresh} />
  }

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>¡Bienvenido!</h1>
      <p>
        Sesión: {session.email} — rol: <strong>{session.membership.role}</strong>
      </p>
      <button onClick={() => authService.signOut()}>Cerrar sesión</button>
      <p style={{ marginTop: 24, color: '#666' }}>
        Aquí sigue el dashboard real (sucursales, POS, inventario...) — próximo módulo.
      </p>
    </div>
  )
}
