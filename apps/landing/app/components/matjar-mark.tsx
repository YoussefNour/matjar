type MatjarMarkProps = {
  className?: string;
};

export function MatjarMark({ className }: MatjarMarkProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
    >
      <path
        d="M15 51V33a8.5 8.5 0 0 1 17 0v18M32 33a8.5 8.5 0 0 1 17 0v18"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="11.5" r="5.5" className="fill-accent" />
    </svg>
  );
}
