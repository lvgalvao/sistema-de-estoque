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
    <div className="space-y-4">
      <h2 className="text-foreground text-base font-semibold">Cadastrar Item</h2>

      {sucesso && (
        <div className="bg-alert-green border border-green-200 text-green-700 px-3 py-2 rounded text-[13px]">
          {sucesso}
        </div>
      )}

      <div className="bg-surface border border-border rounded-md p-4">
        <ItemForm key={sucesso} onSubmit={handleSubmit} submitLabel="Cadastrar" />
      </div>
    </div>
  );
}
