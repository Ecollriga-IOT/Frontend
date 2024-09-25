import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddCropfield } from './pages/AddCropfield'
import { Analytics } from './pages/Analytics'
import { Cropfields } from './pages/Cropfields'
import { DashboardPage } from './pages/Dashboard'
import { Home } from './pages/Home'
import InicioDashboard from './pages/InicioDashboard'
import { Iot } from './pages/Iot'
import { LoginPage } from './pages/LoginPage'
import { PayMethods } from './pages/PayMethods'
import { RegisterPage } from './pages/RegisterPage'
import { Subscription } from './pages/Subscription'
import UserProfile from './pages/UserProfile'



export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<RegisterPage />} />
      
        <Route exact path='/dashboard' element={<DashboardPage />}>
          <Route path='inicio' element={<InicioDashboard />} />
          <Route path='cultivos' element={<Cropfields />} />
          <Route path='cultivos/add-cultivo' element={<AddCropfield />} />
          <Route path="/dashboard/cultivos/edit-cultivo/:id" element={<AddCropfield />} />
          <Route path='subscripcion' element={<Subscription />} />
          <Route path='iot' element={<Iot />} />
          <Route path='metricas' element={<Analytics />} />
          <Route path='perfil' element={<UserProfile/>}/>
          <Route path='metodos-de-pago' element={<PayMethods/>}/>
          {/* CropfieldForm */}
        </Route>
    
    </Routes>
  )
}
