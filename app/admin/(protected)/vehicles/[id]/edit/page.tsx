import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Vehicle } from '@/lib/types';
import VehicleForm from '@/components/VehicleForm';

export const dynamic = 'force-dynamic';

export default async function EditVehiclePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: vehicle } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', params.id)
    .single<Vehicle>();

  if (!vehicle) notFound();

  return (
    <div className="admin-main">
      <div className="admin-header">
        <h1>
          Editar {vehicle.brand} {vehicle.model}
        </h1>
      </div>
      <VehicleForm mode="edit" vehicle={vehicle} />
    </div>
  );
}
