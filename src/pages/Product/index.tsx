
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAddCartMutation } from '../../app/services/cartService'
import { useGetCategoryByIDQuery, useGetProductQuery } from '../../app/services/categoryServices'
import MainLayout from '../../layouts/MainLayout'


const Product = () => {
  const param = useParams()
  const { data: category, isSuccess, isError } = useGetCategoryByIDQuery(Number(param.id))
  const { data, isSuccess: isSuccessProd } = useGetProductQuery(Number(param.id))
  const [addCart] = useAddCartMutation()
  // const handleAddCartClick = () => { 

  // }
  return (
    <MainLayout>
      <section className='container my-10 py-10 shadow-2xl shadow-indigo-200 rounded-2xl'>
        {isError && <h3 className='text-center font-bold text-2xl'>Такой категории не существует</h3>}
        {isSuccess &&
          <>
            <h3 className='text-center font-bold text-2xl'>Диагностика двигателя</h3>
            <div className='max-w-2xl mt-5  relative w-full h-80 bg-white rounded-lg overflow-hidden flex justify-center mx-auto'>
              {isSuccess && <img alt={category.name} src={`http://localhost:8080/${category?.image}`} className="w-full h-full object-center object-cover shadow-lg" />}
            </div>
            <div className="max-w-sm mx-3 md:max-w-2xl relative overflow-x-auto shadow-md sm:rounded-lg mt-10 flex md:mx-auto">
              <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Название
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Цена
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">В корзину</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isSuccessProd && data.map((item: any) => (
                    <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {item.name}
                      </th>
                      <td className="px-6 py-4">
                        {item.price}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => addCart(item.id)}>В корзину</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <section className='mt-5  '>
              <h3 className='text-center text-xl font-bold'>Описание</h3>
              <div className='mt-3 text-lg font-serif mx-4 max-w-xl text-center md:mx-auto  px-3 py-3'>
                {isSuccess && <p>{category.description}</p>}
              </div>
            </section>
          </>
        }

      </section>
    </MainLayout>
  )
}

export default Product