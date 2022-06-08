import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { FilterIcon } from '@heroicons/react/solid'
import SubCategory from "../SubCategory";
import { useGetSubCategoryQuery } from '../../app/services/categoryServices';



const Category = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { data, isLoading } = useGetSubCategoryQuery("")
  const [catId, setCatId] = useState(0)
  return (
    <div className="  bg-gradient-to-r from-white  rounded-sm shadow-xl border-1 border-indigo-50 border">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Фильтры</h2>
                    <button
                      type="button"
                      className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul className="font-medium text-gray-900 px-2 py-3">
                      <li onClick={() => setCatId(0)} className='hover:-translate-y-1 hover:scale-110 delay-200 duration-300 transition ease-in cursor-pointer'>
                        <p>Все</p>
                      </li>
                      {!isLoading && data?.map((category) => (
                        <li key={category.id} onClick={() => setCatId(category.id)}>
                          <p className="block px-2 py-3 ">
                            {category.name}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="lg:mx-20 mx-auto px-4 sm:px-6 lg:px-8 mt-5">
          <div className="relative z-10 flex items-baseline justify-between  pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Услуги</h1>

            <div className="flex items-center">


              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-8 gap-y-10">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul className="text-lg font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                  <li onClick={() => setCatId(0)} className='hover:-translate-y-1 hover:scale-110 delay-200 duration-300 transition ease-in cursor-pointer'>
                    <p>Все</p>
                  </li>
                  {data?.map((category) => (
                    <li key={category.name} onClick={() => setCatId(category.id)} className='hover:-translate-y-1 hover:scale-110 delay-200 duration-300 transition ease-in cursor-pointer'>
                      <p>{category.name}</p>
                    </li>
                  ))}
                </ul>
              </form>

              <div className="lg:col-span-4">
                <SubCategory catId={catId} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Category;
