interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function Header({ title, subtitle, className }: HeaderProps) {
  return (
    <div className={className}>
      <h1 className="font-bold text-2xl mb-2">{title}</h1>
      {subtitle && <h3 className="text-xs text-gray-600">{subtitle}</h3>}
    </div>
  );
}
