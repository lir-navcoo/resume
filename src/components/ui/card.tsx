import * as React from 'react'
export const Card = ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`rounded-2xl border border-white/10 shadow-xl ${className}`} style={{ background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(24px)' }} {...props} />
)
export const CardContent = ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 ${className}`} {...props} />
)
