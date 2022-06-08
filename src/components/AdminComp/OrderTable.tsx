import React, { useState } from 'react'
import { useGetAllOrderQuery, useUpdateOrderMutation } from '../../app/services/orderService'
import { IOrder, IOrderUpdate } from '../../app/types/order.types'
import Spinner from '../Spinner/Spinner'
import ModalAdmin from './ModalAdmin'



const OrderTable = () => {
  const [order, setOrder] = useState<IOrderUpdate>({ id: 1, comment: "", status: "" })
  const [open, setOpen] = useState(false)
  const { data, isLoading, isError, isSuccess } = useGetAllOrderQuery("")
  const [updateOrder] = useUpdateOrderMutation()
  const handleOpen = (item: IOrder) => {
    setOrder(item)
    setOpen(true)
  }
  const handleClick = () => {
    updateOrder(order)
    setOpen(false)
  }
  return (
    <section className='pt-10 mx-5 md:mx-auto'>
      <h1 className='text-center font-medium text-2xl'>Пользователи</h1>
      {isLoading && <Spinner />}
      {isError && <h1 className='text-center font-medium text-xl'>Ошибка</h1>}
      {isSuccess && !data.length ?
        <h1 className='text-center font-medium text-xl'>Пользователей не существует</h1> :
        <section className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
          <table className="w-full text-sm  text-gray-500 dark:text-gray-400 text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  Дата
                </th>
                <th scope="col" className="px-6 py-3">
                  Услуги
                </th>
                <th scope="col" className="px-6 py-3">
                  Цена
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
            <tbody>
              {data?.map(item => (
                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                    {item.price}
                  </td>
                  <td className="px-6 py-4">
                    {item.status}
                  </td>
                  <td className="px-6 py-4">
                    {item.comment !== "" ? item.comment : <p></p>}
                  </td>
                  <td className="px-6 py-4 text-right space-x-5 md:space-y-0 space-y-3 md:flex md:justify-center">
                    <button onClick={() => handleOpen(item)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Изменить</button>
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Распечатать</button>
                    <ModalAdmin setOpen={setOpen} open={open} title={"Изменение пользователя"}>
                      <div>
                        <div className="mb-4">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Комментарий</label>
                          <textarea value={order?.comment} onChange={(e) => setOrder({ ...order, comment: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Комментарий</label>
                          <select onChange={(e) => setOrder({ ...order, status: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Выбрать статус</option>
                            <option value={"Отменён"}>Оменить</option>
                            <option value={"Подтверждён"}>Подтвердить</option>
                            <option value={"Выполнен"}>Выполнен</option>
                          </select>
                        </div>

                        <button onClick={handleClick} type="submit" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Отправить</button>
                      </div>

                    </ModalAdmin>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </section>
      }
    </section>
  )
}

export default OrderTable