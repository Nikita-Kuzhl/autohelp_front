import React from 'react'
import { useGetInfoUserQuery } from '../../app/services/userServices'

const InfoComp = () => {
  const { data, isLoading, isError, isSuccess } = useGetInfoUserQuery("")
  return (
    <section className='mt-10 py-5   bg-white border-4 rounded-lg border-indigo-50 mx-5'>
      {isError && <h1 className='text-xl text-center font-bold'>Ошибка</h1>}
      {isLoading && <></>}
      {isSuccess &&

        <figure className='max-w-2xl md:mx-auto  '>
          <h1 className='text-2xl text-center font-bold'>Личная информация</h1>
          <div className='pt-10 text-xl px-5 font-semibold text-center'>
            <p>ФИО - {data.name}</p>
            <p>Email - {data.email}</p>
            <p>Телефон - {data.telephone}</p>
          </div>

        </figure>

      }

    </section>
  )
}

export default InfoComp