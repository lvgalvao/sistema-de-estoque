import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard', icon: '🏠' },
  { to: '/cadastrar', label: 'Cadastrar Item', icon: '➕' },
  { to: '/listar', label: 'Listar Itens', icon: '📋' },
  { to: '/movimentacoes', label: 'Movimentações', icon: '🔄' },
  { to: '/historico', label: 'Histórico', icon: '📊' },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-navy-dark flex flex-col z-20">
      <div className="flex flex-col items-center py-6 px-4">
        <img src="/logo.png" alt="Logo" className="w-36 mb-1" />
        <span className="text-[0.65rem] text-navy-light tracking-wide">
          Sistema de Controle de Estoque
        </span>
      </div>

      <hr className="border-white/15 mx-4" />

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-navy-blue text-white'
                  : 'text-white/80 hover:bg-white/10'
              }`
            }
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
