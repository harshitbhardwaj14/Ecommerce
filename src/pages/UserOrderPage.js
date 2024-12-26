import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserOrders from '../features/user/component/UserOrders'

function UserOrderPage() {
  return (
    <Navbar>
        <UserOrders></UserOrders>
    </Navbar>
  )
}

export default UserOrderPage