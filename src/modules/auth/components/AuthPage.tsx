import { useState, type FormEvent } from 'react'
import { authService } from '../auth.service'

export function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setBusy(true)
    try {
      if (mode === 'signup') {
        await authService.signUp(email, password, fullName)
        setInfo('Cuenta creada. Si tu proyecto pide confirmación por correo, revisa tu bandeja antes de iniciar sesión.')
      } else {
        await authService.signIn(email, password)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: '80px auto', fontFamily: 'sans-serif' }}>
      <h1>JugoSoft</h1>
      <p>{mode === 'signup' ? 'Crea tu cuenta' : 'Inicia sesión'}</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {mode === 'signup' && (
          <input
            placeholder="Tu nombre completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="correo@negocio.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <button type="submit" disabled={busy}>
          {busy ? 'Procesando...' : mode === 'signup' ? 'Crear cuenta' : 'Entrar'}
        </button>
      </form>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {info && <p style={{ color: 'green' }}>{info}</p>}

      <button
        onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
        style={{ marginTop: 16, background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}
      >
        {mode === 'signup' ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
      </button>
    </div>
  )
}
