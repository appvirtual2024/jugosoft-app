import { supabase } from '@/lib/supabase/client'
import type { Tables, TablesInsert } from '@/lib/supabase/database.types'

export type Organization = Tables<'organizations'>

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const organizationService = {
  /**
   * Crea la organización. El trigger `handle_new_organization` en la base de datos
   * inserta automáticamente al usuario actual como admin en `organization_members`
   * — por eso esto solo funciona con un usuario ya autenticado (auth.uid() no nulo).
   */
  async create(name: string): Promise<Organization> {
    const payload: TablesInsert<'organizations'> = { name, slug: slugify(name) }
    const { data, error } = await supabase.from('organizations').insert(payload).select().single()
    if (error) throw error
    return data
  },
}
