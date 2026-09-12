export default function GlassCard({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-3xl
        border border-white/20
        bg-white/70
        backdrop-blur-xl
        shadow-lg
        hover:shadow-2xl
        hover:-translate-y-1
        transition-all
        duration-300
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}