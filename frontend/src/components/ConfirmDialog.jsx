export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-surface border border-border rounded-md p-4 max-w-sm w-full mx-4">
        <h3 className="text-foreground font-semibold text-[14px] mb-1">{title}</h3>
        <p className="text-secondary text-[13px] mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="h-8 px-3 border border-border text-secondary rounded text-[13px] font-medium hover:bg-black/4 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="h-8 px-3 bg-red-600 text-white rounded text-[13px] font-medium hover:bg-red-700 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
