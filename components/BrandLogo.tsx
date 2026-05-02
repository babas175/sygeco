export interface BrandLogoProps {
  size?: number;
  className?: string;
}

export function BrandLogo({ size = 32, className = "" }: Readonly<BrandLogoProps>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
      <path
        d="M16 8L20 14H12L16 8Z"
        fill="currentColor"
      />
      <path
        d="M16 24L12 18H20L16 24Z"
        fill="currentColor"
      />
      <circle cx="16" cy="16" r="3" fill="currentColor" />
    </svg>
  );
}
