import { useState } from 'react';
import { api } from '../api/client';
import ItemForm from '../components/ItemForm';

export default function Cadastrar() {
  const [sucesso, setSucesso] = useState('');

  const handleSubmit = async (data) => {
    await api.criarItem(data);
    setSucesso('Item cadastrado com sucesso!');
    setTimeout(() => setSucesso(''), 3000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-navy-dark text-2xl font-bold border-b-3 border-yellow-gov pb-2">
        Cadastrar Item
      </h2>

      {sucesso && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-md text-sm">
          {sucesso}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <ItemForm key={sucesso} onSubmit={handleSubmit} submitLabel="Cadastrar" />
      </div>
    </div>
  );
}
