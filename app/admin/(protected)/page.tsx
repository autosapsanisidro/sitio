import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type { Vehicle } from '@/lib/types';
import { STATUS_LABELS } from '@/lib/types';
import DeleteVehicleButton from '@/components/DeleteVehicleButton';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: vehicles } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<Vehicle[]>();

  const list = vehicles ?? [];

  return (
    <div className="admin-main">
      <div className="admin-header">
        <h1>Vehículos ({list.length})</h1>
        <Link className="btn-primary" href="/admin/vehicles/new" style={{ textDecoration: 'none' }}>
          + Cargar vehículo
        </Link>
      </div>

      {list.length === 0 ? (
        <div className="empty-state">Todavía no cargaste ningún vehículo.</div>
      ) : (
        <table className="vt-table">
          <thead>
            <tr>
              <th></th>
              <th>Vehículo</th>
              <th>Precio</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((v) => (
              <tr key={v.id}>
                <td>
                  {v.photos?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="vt-thumb" src={v.photos[0]} alt="" />
                  ) : (
                    <div className="vt-thumb" />
                  )}
                </td>
                <td>
                  <strong>
                    {v.brand} {v.model}
                  </strong>
                  <div style={{ color: '#6b7280', fontSize: 12.5 }}>
                    {v.year ?? '—'} · {v.km != null ? `${v.km.toLocaleString('es-AR')} km` : '—'}
                  </div>
                </td>
                <td>
                  {v.price != null
                    ? `${v.currency === 'USD' ? 'US$' : '$'} ${v.price.toLocaleString('es-AR')}`
                    : '—'}
                </td>
                <td>
                  <span className={`vt-badge ${v.status}`}>{STATUS_LABELS[v.status]}</span>
                </td>
                <td>
                  <div className="vt-actions">
                    <Link className="btn-outline" href={`/admin/vehicles/${v.id}/edit`}>
                      Editar
                    </Link>
                    <DeleteVehicleButton id={v.id} label={`${v.brand} ${v.model}`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
