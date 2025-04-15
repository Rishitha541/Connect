import Image from "next/image"

interface LogoProps {
  size?: "small" | "medium" | "large"
  className?: string
}

export default function Logo({ size = "medium", className = "" }: LogoProps) {
  // Define sizes for different variants
  const sizes = {
    small: { width: 80, height: 40 },
    medium: { width: 120, height: 60 },
    large: { width: 160, height: 80 },
  }

  const { width, height } = sizes[size]

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Image
        src="/images/connect-plus-logo.png"
        alt="Connect+ Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  )
}
