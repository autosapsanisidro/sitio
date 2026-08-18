import VehicleForm from '@/components/VehicleForm';

export default function NewVehiclePage() {
  return (
    <div className="admin-main">
      <div className="admin-header">
        <h1>Cargar vehículo</h1>
      </div>
      <VehicleForm mode="create" />
    </div>
  );
}
