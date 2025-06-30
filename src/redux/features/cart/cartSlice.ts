import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
  id: string
  name: string
  image: string
  basePrice: number
  size: {
    name: string
    price: number
  }
  sauce: {
    name: string
    price: number
  }
  extras: Array<{
    id: string
    name: string
    price: number
  }>
  quantity: number
  totalPrice: number
  type: "pizza" | "mix-pizza"
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

// Load cart from localStorage
const loadCartFromStorage = (): CartState => {
  if (typeof window !== "undefined") {
    try {
      const savedCart = localStorage.getItem("prof-pizza-cart")
      if (savedCart) {
        return JSON.parse(savedCart)
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
    }
  }
  return initialState
}

// Save cart to localStorage
const saveCartToStorage = (state: CartState) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("prof-pizza-cart", JSON.stringify(state))
    } catch (error) {
      console.error("Error saving cart to localStorage:", error)
    }
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size.name === action.payload.size.name &&
          item.sauce.name === action.payload.sauce.name &&
          JSON.stringify(item.extras) === JSON.stringify(action.payload.extras),
      )

      if (existingItem) {
        existingItem.quantity += action.payload.quantity
        existingItem.totalPrice = existingItem.basePrice * existingItem.quantity
      } else {
        state.items.push(action.payload)
      }

      // Recalculate totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0)

      saveCartToStorage(state)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0)
      saveCartToStorage(state)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
        item.totalPrice = item.basePrice * item.quantity
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
        state.totalPrice = state.items.reduce((total, item) => total + item.totalPrice, 0)
        saveCartToStorage(state)
      }
    },
    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
      saveCartToStorage(state)
    },
    loadCartFromStorageAction: (state) => {
      const loadedState = loadCartFromStorage()
      state.items = loadedState.items
      state.totalItems = loadedState.totalItems
      state.totalPrice = loadedState.totalPrice
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, loadCartFromStorageAction } = cartSlice.actions
export default cartSlice.reducer
