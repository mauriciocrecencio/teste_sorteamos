import styles from './styles.module.css'

import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/Header'

import { useProductStore } from '../../store/productStore'

import { ToastContainer } from 'react-toastify'
import clsx from 'clsx'
import Footer from '../Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const getProducts = useProductStore((state) => state.callGetProducts)

  useEffect(() => {
    async function fetchData() {
      await getProducts()
    }
    if (router.route !== '/sorteio/[slug]') {
      fetchData()
    }
  }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [router])

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* TODO: melhorar forma de fazer isso */}
        <section className={clsx(styles['main-fill'])}></section>
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </>
  )
}
