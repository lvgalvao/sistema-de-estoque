import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/cadastrar', label: 'Cadastrar Item' },
  { to: '/listar', label: 'Listar Itens' },
  { to: '/movimentacoes', label: 'Movimentações' },
  { to: '/historico', label: 'Histórico' },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-52 bg-surface border-r border-border flex flex-col z-20">
      <div className="flex flex-col items-center gap-2 px-4 py-4">
        <img src="/logo.png" alt="Logo Marinha" className="h-10 object-contain" />
        <span className="text-foreground font-semibold text-[11px] uppercase tracking-wide">
          Controle de Estoque
        </span>
      </div>

      <nav className="flex-1 px-2 py-1 space-y-0.5">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex items-center px-3 py-1.5 rounded text-[13px] font-medium transition-colors ${
                isActive
                  ? 'bg-accent/8 text-accent'
                  : 'text-secondary hover:bg-black/4 hover:text-foreground'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border px-3 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-[12px] font-semibold shrink-0">
            LV
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-foreground truncate">Luciano Vasconcelos</p>
            <p className="text-[11px] text-muted truncate">Suporte</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
