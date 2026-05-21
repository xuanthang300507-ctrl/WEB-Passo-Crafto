import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Passo Crafto — AI, Software, Finance & Marketing',
  description: 'We build and experiment across AI, software, finance, and marketing. Focused on practical products, clean systems, and modern tools.',
  authors: [{ name: 'Passo Crafto' }],
  keywords: ['AI', 'software', 'finance', 'marketing', 'technology', 'startup'],
  openGraph: {
    title: 'Passo Crafto',
    description: 'We build and experiment across AI, software, finance, and marketing.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-white text-black antialiased">
        {children}
      </body>
    </html>
  )
}
