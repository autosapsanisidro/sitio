export type VehicleStatus = 'published' | 'paused' | 'sold';
export type Transmission = 'manual' | 'automatica';
export type Fuel = 'nafta' | 'diesel' | 'gnc' | 'hibrido' | 'electrico';

export interface Vehicle {
  id: string;
  created_at: string;
  updated_at: string;
  brand: string;
  model: string;
  version: string | null;
  year: number | null;
  km: number | null;
  price: number | null;
  currency: string;
  transmission: Transmission | null;
  fuel: Fuel | null;
  color: string | null;
  description: string | null;
  status: VehicleStatus;
  featured: boolean;
  mercadolibre_url: string | null;
  photos: string[];
}

export const FUEL_LABELS: Record<Fuel, string> = {
  nafta: 'Nafta',
  diesel: 'Diésel',
  gnc: 'GNC',
  hibrido: 'Híbrido',
  electrico: 'Eléctrico',
};

export const TRANSMISSION_LABELS: Record<Transmission, string> = {
  manual: 'Manual',
  automatica: 'Automática',
};

export const STATUS_LABELS: Record<VehicleStatus, string> = {
  published: 'Publicado',
  paused: 'Pausado',
  sold: 'Vendido',
};
