// Listas precargadas para los campos de Marca / Modelo / Color del panel de carga.
// El campo sigue aceptando texto libre (son sugerencias, no una lista cerrada) —
// si cargan una marca o modelo que no está acá, se guarda igual.

export const BRANDS = [
  'Volkswagen',
  'Ford',
  'Chevrolet',
  'Fiat',
  'Renault',
  'Peugeot',
  'Toyota',
  'Honda',
  'Nissan',
  'Citroën',
  'Jeep',
  'RAM',
  'Mercedes-Benz',
  'BMW',
  'Audi',
  'Kia',
  'Hyundai',
  'Suzuki',
  'Mitsubishi',
  'Chery',
  'JAC',
  'DS',
  'Volvo',
  'Subaru',
  'Alfa Romeo',
  'Mini',
  'Porsche',
  'Land Rover',
  'Jaguar',
  'Isuzu',
];

export const MODELS_BY_BRAND: Record<string, string[]> = {
  Volkswagen: [
    'Gol', 'Gol Trend', 'Polo', 'Virtus', 'Voyage', 'Suran', 'Fox', 'Up!',
    'T-Cross', 'Taos', 'Vento', 'Amarok', 'Saveiro', 'Bora', 'Passat',
  ],
  Ford: ['Fiesta', 'Focus', 'Ka', 'EcoSport', 'Ranger', 'Territory', 'Mondeo', 'Fusion', 'F-100', 'Escort'],
  Chevrolet: ['Corsa', 'Celta', 'Classic', 'Onix', 'Prisma', 'Cruze', 'Spin', 'Tracker', 'S10', 'Agile', 'Aveo', 'Cobalt'],
  Fiat: ['Palio', 'Siena', 'Uno', 'Punto', 'Idea', 'Cronos', 'Argo', 'Toro', 'Strada', 'Mobi', 'Pulse', 'Fiorino'],
  Renault: ['Clio', 'Sandero', 'Logan', 'Duster', 'Kangoo', 'Fluence', 'Megane', 'Symbol', 'Stepway', 'Captur', 'Kwid', 'Oroch'],
  Peugeot: ['206', '207', '208', '307', '308', '3008', 'Partner', '2008', '408'],
  Toyota: ['Corolla', 'Etios', 'Hilux', 'SW4', 'Yaris', 'Camry', 'RAV4'],
  Honda: ['Civic', 'Fit', 'HR-V', 'CR-V', 'City'],
  Nissan: ['March', 'Versa', 'Sentra', 'Kicks', 'Frontier', 'Note'],
  Citroën: ['C3', 'C4', 'Berlingo', 'C4 Cactus', 'Xsara'],
  Jeep: ['Renegade', 'Compass', 'Cherokee'],
  RAM: ['1500', '700'],
  'Mercedes-Benz': ['Clase A', 'Clase C', 'Clase E', 'Sprinter'],
  BMW: ['Serie 1', 'Serie 3', 'X1', 'X3'],
  Audi: ['A3', 'A4', 'Q3', 'Q5'],
  Kia: ['Rio', 'Sportage', 'Cerato', 'Picanto'],
  Hyundai: ['HB20', 'Creta', 'Tucson', 'i10'],
  Suzuki: ['Fun', 'Swift', 'Ertiga'],
  Mitsubishi: ['Lancer', 'ASX', 'L200'],
};

export const ALL_MODELS = Array.from(new Set(Object.values(MODELS_BY_BRAND).flat())).sort();

export const COLORS = [
  'Blanco', 'Negro', 'Gris', 'Plata', 'Rojo', 'Azul', 'Verde', 'Beige', 'Bordo', 'Marrón',
];
