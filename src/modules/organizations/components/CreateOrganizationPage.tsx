import { useState, type FormEvent } from 'react'
import { organizationService } from '../organization.service'

interface Props {
  onCreated: () => void
}

export function CreateOrganizationPage({ onCreated }: Props) {
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await organizationService.create(name)
      onCreated()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear la organización')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: '80px auto', fontFamily: 'sans-serif' }}>
      <h1>Crea tu negocio</h1>
      <p>Quedarás como administrador de esta organización.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          placeholder="Nombre del negocio (ej: JUGOS LUMI)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" disabled={busy}>
          {busy ? 'Creando...' : 'Crear negocio'}
        </button>
      </form>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </div>
  )
}
