import React from 'react'
import { HeaderPayMethods } from '../components/payMethods/HeaderPayMethods'
import { BodyPayMethods } from '../components/payMethods/BodyPayMethods'

export const PayMethods = () => {
  return (
    <div>
        <HeaderPayMethods />
        <BodyPayMethods />
    </div>
  )
}
