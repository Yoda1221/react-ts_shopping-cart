import { useShoppingCart } from "../context/ShoppingCartContext"
import items from "../data/items.json"
import { Button, Stack } from "react-bootstrap"
import { formatCurrency } from "../utils/formatCurrency"

type CartItemProps = {
    id: number,
    quantity: number
}

const CartItem = ({ id, quantity}: CartItemProps) => {
    const { removeFromCart } = useShoppingCart()
    const item = items.find(i => i.id === id)

    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={3} className="d-felx align-image-center">
            <img 
                src={item.imgUrl} 
                style={{ width: "125px", height: "75px", objectFit: "cover"}}
            />
            <div className="me-auto">
                <div>
                    {item.name}
                </div>
                <div 
                    className="text-muted"
                    style={{ fontSize: "0.75rem" }}
                >
                    {quantity > 1 && (
                        <span 
                            className="text-muted"
                            style={{ fontSize: "0.65rem" }}
                        >
                            {quantity}&nbsp;x&nbsp;{formatCurrency(item.price)}
                        </span>
                    )}
                    
                </div>
            </div>
            <div>{ formatCurrency(item.price * quantity) }</div>
            <Button
                size="sm"
                variant="outline-danger"
                onClick={() => removeFromCart(id)}
            >&times;</Button>
        </Stack>
    )
}

export default CartItem
