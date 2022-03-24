import { NextPage } from 'next'
import { ReactNode } from 'react'

export type CustomNextPageProps = NextPage & {
  pageTitle?: ReactNode
}
