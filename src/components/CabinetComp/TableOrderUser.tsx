import React from 'react'
import { useCancelOrderMutation, useGetOrderByUserQuery } from '../../app/services/orderService'
import Spinner from '../Spinner/Spinner'

const TableOrderUser = () => {
  const { data, isError, isLoading, isSuccess } = useGetOrderByUserQuery("")
  const [cancelOrder] = useCancelOrderMutation()
  return (
    <section>
      {isError && <h1 className='pt-10 text-center text-xl font-bold'>Ошибка</h1>}
      {isLoading && <Spinner />}
      {isSuccess &&
        <>
          {!data.length && <h1 className='pt-10 text-center text-xl font-bold'>Заказы отсутсвуют...</h1>}
          {data.length &&
            <>
              <h1 className='pt-10 text-center text-xl font-bold'>Заказы</h1>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-5">
                <table className="w-full mt-5 text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        id
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Дата
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Продукты
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Итоговая сумма
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Статус
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Комментарий
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='text-center'>
                    {data.map(item => (
                      <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {item.id}
                        </th>
                        <td className="px-6 py-4">
                          {item.date}
                        </td>
                        <td className="px-6 py-4">
                          {item.products.map(product => (
                            <p key={product.id}>{product.name}</p>
                          ))}
                        </td>
                        <td className="px-6 py-4">
                          {item.price} руб.
                        </td>
                        <td className="px-6 py-4">
                          {item.status}
                        </td>
                        <td className="px-6 py-4">
                          {item.comment ? item.comment : <>Нет</>}
                        </td>
                        {item.status === "Новый" ?
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => cancelOrder(item.id)} className="font-medium text-red-600 dark:text-blue-500 hover:underline">Отменить</button>
                          </td> : <p></p>
                        }
                      </tr>
                    ))}


                  </tbody>
                </table>
              </div>
            </>
          }
        </>
      }


    </section>
  )
}

export default TableOrderUser