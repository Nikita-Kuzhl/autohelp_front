import { FC, useState } from "react";
import { api } from "../../app/hooks/hooks";
import { userAction } from "../../app/features/user/userSlice";
import { useAppDispatch } from "../../app/hooks/hooks";
import { IAuth } from "../../app/types/auth.types";
import MainLayout from "../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";



const Signin: FC = () => {
  const [userData, setUserData] = useState<IAuth>({ telephone: '', password: '' })
  const [error, setError] = useState([])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogIn = async () => {
    try {
      const { data } = await api.post("/auth/signin", JSON.stringify(userData));
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
              Авторизироваться
            </h2>
            <div className="mt-2 text-center text-sm text-gray-600">
              Или{" "}
              <p
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                зарегестрироваться
              </p>
            </div>
          </div>
          <form className="mt-8 space-y-6" >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="sr-only">
                  Телефон
                </label>
                <input
                  id="telephone"
                  name="telephone"
                  type="telephone"

                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Телефон"
                  value={userData.telephone}
                  onChange={(e) => setUserData({ ...userData, telephone: e.target.value })}
                />
              </div>
              <div>
                <label className="sr-only">
                  Пароль
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  // autoComplete="current-password"
                  // required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Пароль"
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <h1
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Забыли пароль?
                </h1>
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
          <button
            onClick={() => handleLogIn()}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Войти
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Signin;
