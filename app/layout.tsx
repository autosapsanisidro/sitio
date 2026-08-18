import type { Metadata } from 'next';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'AUTOSAP San Isidro — Usados seleccionados en Beccar',
  description:
    'Concesionario de autos usados en Av. Centenario 1494, Beccar, San Isidro. Revisión mecánica, financiación y gestoría incluida.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
