import LogoutButton from '@/components/LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-white.svg" alt="AUTOSAP" />
        <div className="right">
          <span>Panel de carga</span>
          <LogoutButton />
        </div>
      </div>
      {children}
    </div>
  );
}
