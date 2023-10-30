import Guard from '@/components/guard'
import AppProvider from '@/provider/AppProvider'
import '@/styles/globals.css'
import '@/styles/home.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}
