import React, { useState } from 'react'
import { useDelUserMutation, useGetAllUserQuery, useUpdateUserMutation } from '../../app/services/userServices'
import { IUpdateUser } from '../../app/types/user.types'
import Spinner from '../Spinner/Spinner'
import ModalAdmin from './ModalAdmin'

const UserTable = () => {
  const [user, setUser] = useState<IUpdateUser>({
    id: 1,
    telephone: '',
    name: '',
    email: '',
    roleId: 1
  })
  const [open, setOpen] = useState(false)
  const { data, isLoading, isSuccess, isError } = useGetAllUserQuery('')
  const [updateUser] = useUpdateUserMutation()
  const [delUser] = useDelUserMutation()
  const handleOpen = (item: IUpdateUser) => {
    setUser(item)
    setOpen(true)
  }
  const handleClick = () => {
    updateUser(user)
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
                  ФИО
                </th>
                <th scope="col" className="px-6 py-3">
                  Телефон
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  role
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
                    {item.name}
                  </td>
                  <td className="px-6 py-4">
                    {item.telephone}
                  </td>
                  <td className="px-6 py-4">
                    {item.email}
                  </td>
                  <td className="px-6 py-4">
                    {item.roles.value}
                  </td>
                  <td className="px-6 py-4 text-right space-x-5 md:space-y-0 space-y-3 md:flex md:justify-center">
                    <button onClick={() => handleOpen(item)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Изменить</button>
                    <button onClick={() => delUser(item)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Удалить</button>
                    <ModalAdmin setOpen={setOpen} open={open} title={"Изменение пользователя"}>
                      <div>
                        <div className="mb-4">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">ФИО</label>
                          <input value={user?.name} onChange={(e) => setUser({ ...user, name: e.target.value })} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Телефон</label>
                          <input onChange={(e) => setUser({ ...user, telephone: e.target.value })} value={user?.telephone} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                          <input value={user?.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className='mb-4'>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                            <select onChange={(e) => setUser({ ...user, roleId: Number(e.target.value) })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              <option>Выбрать роль</option>
                              <option value={1}>Пользователь</option>
                              <option value={2}>Сотрудник</option>
                              <option value={3}>Администратор</option>
                            </select>
                          </div>

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

export default UserTable