export default function Topbar() {
  return (
    <>
      <div className="bg-white border-b border-navy-light px-6 py-3 flex items-center gap-4">
        <img src="/logo.png" alt="Logo" className="h-10 object-contain" />
      </div>
      <div className="h-[3px] bg-gradient-to-r from-yellow-gov to-green-gov" />
    </>
  );
}
