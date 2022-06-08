import { Tab } from '@headlessui/react'
import React from 'react'
import CategoryTable from '../../components/AdminComp/CategoryTable'
import OrderTable from '../../components/AdminComp/OrderTable'
import ProductTable from '../../components/AdminComp/ProductTable'
import SubCategoryTable from '../../components/AdminComp/SubCategoryTable'
import UserTable from '../../components/AdminComp/UserTable'
import MainLayout from '../../layouts/MainLayout'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
const TagsName = [
  { id: 1, name: 'Заказы' },
  { id: 2, name: 'Пользователи' },
  { id: 3, name: 'Категории' },
  { id: 4, name: 'Подкатегории' },
  { id: 5, name: 'Продукты' }
]

const AdminPanel = () => {


  return (
    <MainLayout>
      <section className='py-20 mx-1 md:mx-10'>
        <h1 className='text-center font-bold text-3xl'>Панель администратора</h1>
        <section className="w-full   py-16 sm:px-0">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {TagsName.map(item => (
                <Tab key={item.id} className={({ selected }: any) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-xs md:text-lg font-medium leading-5 text-black',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-black-100 hover:bg-indigo-900/[0.12] hover:text-indigo-900'
                  )
                }>{item.name}</Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel><OrderTable /></Tab.Panel>
              <Tab.Panel><UserTable /></Tab.Panel>
              <Tab.Panel><CategoryTable /></Tab.Panel>
              <Tab.Panel><SubCategoryTable /></Tab.Panel>
              <Tab.Panel><ProductTable /></Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </section>
      </section>
    </MainLayout>
  )
}

export default AdminPanel