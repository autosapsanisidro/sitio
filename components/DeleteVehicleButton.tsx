'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function DeleteVehicleButton({ id, label }: { id: string; label: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!confirm(`¿Eliminar "${label}"? Esta acción no se puede deshacer.`)) return;
    setBusy(true);
    const { error } = await supabase.from('vehicles').delete().eq('id', id);
    setBusy(false);
    if (error) {
      alert('No se pudo eliminar: ' + error.message);
      return;
    }
    router.refresh();
  }

  return (
    <button className="btn-danger" onClick={handleDelete} disabled={busy}>
      {busy ? '…' : 'Eliminar'}
    </button>
  );
}
