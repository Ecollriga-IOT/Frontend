import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddCropfield } from './pages/AddCropfield'
import { Analytics } from './pages/Analytics'
import { Cropfields } from './pages/Cropfields'
import { DashboardPage } from './pages/Dashboard'
import InicioDashboard from './pages/InicioDashboard'
import { Iot } from './pages/Iot'
import { LoginPage } from './pages/LoginPage'
import { PayMethods } from './pages/PayMethods'
import { RegisterPage } from './pages/RegisterPage'
import { Subscription } from './pages/Subscription'
import UserProfile from './pages/UserProfile'
import { AddCard } from './pages/AddCard'



export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<RegisterPage />} />
      
        <Route exact path='/dashboard' element={<DashboardPage />}>
          <Route path='inicio' element={<InicioDashboard />} />
          <Route path='cultivos' element={<Cropfields />} />
          <Route path='cultivos/add-cultivo' element={<AddCropfield />} />
          <Route path='cultivos/edit-cultivo/:id' element={<AddCropfield />} />
          <Route path='subscripcion' element={<Subscription />} />
          <Route path='iot' element={<Iot />} />
          <Route path='metricas' element={<Analytics />} />
          <Route path='perfil' element={<UserProfile/>}/>
          <Route path='metodos-de-pago' element={<PayMethods/>}/>
          <Route path='metodos-de-pago/add-card' element={<AddCard />} />
          <Route path='metodos-de-pago/edit-card/:id' element={<AddCard />} />
          {/* CropfieldForm */}
        </Route>
    
    </Routes>
  )
}
