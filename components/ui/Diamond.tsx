interface DiamondProps {
  className?: string
}

export default function Diamond({ className = '' }: DiamondProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2L22 12L12 22L2 12L12 2Z" />
    </svg>
  )
}
