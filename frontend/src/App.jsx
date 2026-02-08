import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Cadastrar from './pages/Cadastrar';
import Listar from './pages/Listar';
import Movimentacoes from './pages/Movimentacoes';
import Historico from './pages/Historico';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="cadastrar" element={<Cadastrar />} />
          <Route path="listar" element={<Listar />} />
          <Route path="movimentacoes" element={<Movimentacoes />} />
          <Route path="historico" element={<Historico />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
