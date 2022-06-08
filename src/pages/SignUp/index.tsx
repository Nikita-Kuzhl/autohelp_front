import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAction } from '../../app/features/user/userSlice';
import { api, useAppDispatch } from '../../app/hooks/hooks';
import { IReg } from '../../app/types/auth.types';
import MainLayout from '../../layouts/MainLayout';

const Signup: FC = () => {
  const [userData, setUserData] = useState<IReg>({ telephone: '', name: '', email: '', password: '' })
  const [repeat, setRepeat] = useState('')
  const [error, setError] = useState([])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleReg = async () => {
    try {
      //@ts-ignore
      if (userData.password !== repeat) return setError({ message: 'Пароли не совпадают' })
      const { data } = await api.post("/auth/signup", JSON.stringify(userData));
      dispatch(userAction.addToken({ token: data.token, role: data.role }))
      navigate('/')
    } catch (error: any) {
      setError(error.response.data);
    }
  }
  return (
    <MainLayout>
      <div className="flex py-auto py-32  items-center justify-center  px-4 sm:px-6 lg:px-8">
        <div className="max-w-md p-4  w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Регистрация
            </h2>
            <div className="mt-2 text-center text-sm text-gray-600">
              Или{" "}
              <p
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Авторизироваться
              </p>
            </div>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="sr-only">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"

                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="sr-only">
                  ФИО
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="ФИО"
                />
              </div>
              <div>
                <label className="sr-only">
                  Телефон
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={userData.telephone}
                  onChange={(e) => setUserData({ ...userData, telephone: e.target.value })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Телефон"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Пароль
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"

                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Пароль"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Повторный пароль
                </label>
                <input
                  id="rep_password"
                  name="rep_password"
                  type="password"

                  value={repeat}
                  onChange={(e) => setRepeat(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Повторите пароль"
                />
              </div>
            </div>

            <div className="flex items-center content-end px-3">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Согласиться с регистрацией
                </label>
              </div>
            </div>
            {error.length > 0 && error.map((item: any) => (
              <div key={item.value} className="bg-indigo-100 rounded-lg py-1 px-1  text-indigo-700 text-center text-sm" role="alert">
                {item.value}
              </div>
            ))}
            {/* @ts-ignore */}
            {error.message &&
              <div className="bg-indigo-100 rounded-lg py-1 px-1  text-indigo-700 text-center text-sm" role="alert">
                {/* @ts-ignore */}
                {error.message}
              </div>
            }

          </form>
          <div>
            <button
              onClick={() => handleReg()}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Зарегестрироваться
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Signup