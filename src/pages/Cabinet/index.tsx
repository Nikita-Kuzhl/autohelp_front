import React from 'react'
import InfoComp from '../../components/CabinetComp/InfoComp'
import TableOrderUser from '../../components/CabinetComp/TableOrderUser'
import MainLayout from '../../layouts/MainLayout'

const CabinetPage = () => {
  return (
    <MainLayout>
      <section className='py-20'>
        <h1 className='font-bold text-center text-3xl'>Личный кабинет</h1>
        <InfoComp />
        <TableOrderUser />
      </section>
    </MainLayout>
  )
}

export default CabinetPage