"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { useEffect } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { loadCartFromStorageAction } from "@/redux/features/cart/cartSlice"

function CartLoader() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadCartFromStorageAction())
  }, [dispatch])

  return null
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <CartLoader />
      {children}
    </Provider>
  )
}