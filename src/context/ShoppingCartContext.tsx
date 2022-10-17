import { createContext, ReactNode, useContext, useState } from "react"
import ShoppingCart from "../components/ShoppingCart"
import {useLocalStorege} from "../hooks/useLocaleStorege"

type ShCaPrProps = {
    children: ReactNode
}

type CartItem = {
    id: number,
    quantity: number
}

type ShoppingCartContext = {
    cartQuantity: number,
    cartItems: CartItem[],
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseItemQuantity: (id: number) => void
    decreaseItemQuantity: (id: number) => void
    removeFromCart: (id: number) => void
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShCaPrProps) {
    const [isOpen, setIsOpen]   = useState(false)
    const [cartItems, setCartItems] = useLocalStorege<CartItem[]>(
        "shoppingCart", []
    )
    const cartQuantity = cartItems.reduce((quanty, item) => 
        item.quantity + quanty, 0
    )
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    function increaseItemQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1}]
            } else {
                return currItems.map( item => {
                    if (item.id === id) return { ...item, quantity: item.quantity + 1}
                    else return item
                })
            }
        })
    }
    function decreaseItemQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map( item => {
                    if (item.id === id) return { ...item, quantity: item.quantity - 1}
                    else return item
                    
                })
            }
        })
    }
    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return <ShoppingCartContext.Provider value={{
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        getItemQuantity, 
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart
        }}>
        { children }
        <ShoppingCart isOpen={ isOpen } />
    </ShoppingCartContext.Provider>
}
