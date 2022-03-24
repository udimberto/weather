import '../styles/globals.css'
import NextHead from 'next/head'
import { NextComponentType } from 'next'
import type { AppProps } from 'next/app'
import { AppContexts } from '../contexts/AppContexts'
import { Header } from '../components/Header/Header'
import { Layout } from '../components/Layout/Layout'

export type NextCustomAppProps = AppProps & {
  Component: NextComponentType & {
    pageTitle?: string
  }
}

function NextCustomApp({
  Component,
  pageProps,
} : NextCustomAppProps) {
  const {
    pageTitle,
  } = Component

  return (
    <>
      <NextHead>
        <title>
          {pageTitle}
        </title>
      </NextHead>
      <AppContexts>
        <Layout>
          <Header>
            {pageTitle}
          </Header>
          <Component
            {...pageProps}
          />
        </Layout>
      </AppContexts>
    </>
  )
}

export default NextCustomApp
