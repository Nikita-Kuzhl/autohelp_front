// import React, { useEffect } from "react";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XIcon } from "@heroicons/react/outline";
import { useDelCartItemMutation, useGetCartQuery } from "../../app/services/cartService";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { cartAction } from "../../app/features/cart/cartSlice";
import { ICart } from "../../app/types/cart.types";
import { userAction } from "../../app/features/user/userSlice";
import OrderModal from "./OrderModal";
// import { useAppDispatch } from "../../app/hooks/hooks";
// import { userAction } from "../../app/features/user/userSlice";


interface IProps {
  open: boolean,
  setOpen: (flag: boolean) => void
}

const CartDialog = (props: IProps) => {
  let [isOpen, setIsOpen] = useState(false)
  const [products, setProducts] = useState<ICart[]>([])
  const { data, isLoading, isSuccess, error } = useGetCartQuery('')
  const [delCartItem] = useDelCartItemMutation()
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cart)

  const handleClick = () => {
    props.setOpen(false)
    setIsOpen(true)
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(cartAction.checkCart(products))
      setProducts(data)
    }
    // @ts-ignore
    if (error?.status === 401) {
      dispatch(userAction.removeToken(""))
    }
  }, [data, dispatch, error, isSuccess, products])
  return (
    <>
      <Transition.Root show={props.open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-50"
          onClose={props.setOpen}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 z-50 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="pointer-events-none fixed z-50 inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="flex gap-2 text-lg font-medium text-gray-900">
                          <ShoppingCartIcon className="w-8 h-8" />
                          Корзина
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => props.setOpen(false)}
                          >
                            <span className="sr-only">Закрыть панель</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {isLoading && <h1 className="text-center text-2xl">Loading...</h1>}
                            {isSuccess && <>
                              {!products.length && <h1 className="text-center text-2xl">Корзина пуста</h1>}
                              {products.length && products?.map((product) => (
                                <li key={product.productId} className="flex py-6">
                                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src='/icons/favicon.ico'
                                      alt='asd'
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <p>
                                            {" "}
                                            {product.products.name}{" "}
                                          </p>
                                        </h3>
                                        <p className="ml-4">{product.products.price} руб.</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() => delCartItem(product.productId)}
                                        >
                                          Удалить
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}

                            </>}

                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-400 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Общая стоимость</p>
                        {isSuccess && <p>{cart.price} руб</p>}
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Налог включен в стоимость.
                      </p>
                      <button className="mt-6" onClick={() => handleClick()}>
                        <p
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Оформить
                        </p>
                      </button>

                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          или{" "}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => props.setOpen(false)}
                          >
                            Продолжить покупки
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>

        </Dialog>
      </Transition.Root>
      <OrderModal setIsOpen={setIsOpen} isOpen={isOpen} products={products} />
    </>
  );
};

export default CartDialog;
