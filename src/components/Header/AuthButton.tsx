import React, { Fragment } from "react";
import { BriefcaseIcon, LoginIcon, LogoutIcon, UserAddIcon, UserCircleIcon, UserIcon, ServerIcon } from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { Link, useNavigate } from "react-router-dom";
import { userAction } from "../../app/features/user/userSlice";

const Auth = () => {
  const navigate = useNavigate()
  const { isAdmin, isAuth, isStaff, isUser } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const hadnleExit = () => {
    dispatch(userAction.removeToken(''))
    navigate('/')
  }
  return (
    <>
      <div className="md:flex pt-2 md:pt-1 md:cursor-pointer hover:scale-105 hover:-translate-y-1 duration-300 hover:opacity-75 md:gap-0 grid grid-cols-2  px-24 md:px-0  p-1 md:p-0">

        <UserIcon className="md:hidden w-7 h-7" />
        <p className="md:hidden text-xl">Профиль</p>
      </div>
      <Menu as="div" className="hidden md:relative md:inline-block md:text-center">
        <div>
          <Menu.Button className=" pt-1.5 hover:scale-105 hover:-translate-y-1 duration-300 hover:opacity-75">
            <UserIcon className="hidden md:flex w-7 h-7" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-in duration-500 transform"
          enterFrom="opacity-0 translate-x-full -translate-y-full"
          enterTo="opacity-100 translate-x-0"
          leave="transition ease-in duration-500 transform"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-full"
        >
          <Menu.Items className="fixed  right-0 w-56 mt-8 origin-top-right mx-10 bg-white divide-y ring-black rounded-md shadow-lg ring-1   ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {isAuth ?

                <>
                  {isUser && <Menu.Item as='div' >
                    <Link to='/cabinet' className="flex px-4 py-2 text-lg text-gray-700 gap-4">
                      <UserCircleIcon className="w-7 h-7" />
                      Профиль
                    </Link>
                  </Menu.Item>}
                  {isAdmin && <Menu.Item as='div' >
                    <Link to='/admin' className="flex px-4 py-2 text-lg text-gray-700 gap-4">
                      <ServerIcon className="w-7 h-7" />
                      Админ панель
                    </Link>
                  </Menu.Item>}
                  {isStaff && <Menu.Item as='div' >
                    <Link to='/staff' className="flex px-4 py-2 text-lg text-gray-700 gap-4">
                      <BriefcaseIcon className="w-7 h-7" />
                      Кабинет сотрундинка
                    </Link>
                  </Menu.Item>}
                  <Menu.Item as='div' >
                    <Menu.Button className="flex px-4 py-2 text-lg text-gray-700 gap-4" onClick={() => hadnleExit()} >
                      <LogoutIcon className="w-7 h-7" />
                      Выйти
                    </Menu.Button>
                  </Menu.Item> </> : <>
                  <Menu.Item as='div' >
                    <Link to='/signin' className="px-4 py-2 text-lg text-gray-700 flex gap-4 cursor-pointer">
                      <LoginIcon className="w-7 h-7" />
                      Авторизация
                    </Link>
                  </Menu.Item>
                  <Menu.Item as='div' >
                    <Link to='/signup' className="flex px-4 py-2 text-lg text-gray-700 gap-4 cursor-pointer">
                      <UserAddIcon className="w-7 h-7" />
                      Регистрация
                    </Link>
                  </Menu.Item>
                </>
              }
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

    </>
  );
};

export default Auth;
