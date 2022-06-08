import { ClockIcon, MailIcon, MapIcon, PhoneIcon } from '@heroicons/react/outline'
import React from 'react'
import MainLayout from '../../layouts/MainLayout'

const About = () => {
  const rowClass =
    "flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none"
  const leftClass = "w-full sm:w-1/3 font-medium text-center sm:text-left flex"
  const rightClass = "flex-1 text-center sm:text-left"
  return (
    <MainLayout>
      <section className='my-20 md:gap-20  grid md:grid-cols-2 container text-center '>
        <div className="w-full pt-20 rounded-lg  bg-white border-4 border-indigo-100 px-5 shadow-md shadow-indigo-300">
          <h3 className="text-2xl font-medium uppercase">Контакты</h3>
          <div className="mt-10">
            <div className={rowClass}>
              <span className={leftClass}><MapIcon height={20} /> Адрес</span>
              <span className={rightClass}>улица 16 лет Октября, 2А</span>
            </div>
            <div className={rowClass}>
              <span className={leftClass}><MailIcon height={20} /> Email</span>
              <span className={rightClass}>autohelp.vl@yandex.ru</span>
            </div>
            <div className={rowClass}>
              <span className={leftClass}><PhoneIcon height={20} /> Телефон</span>
              <span className={rightClass}>8 (920) 123-12-12</span>
            </div>
            <div className={rowClass}>
              <span className={leftClass}><ClockIcon height={20} /> Режим работы</span>
              <span className={rightClass}>пн-вс: 9.00 - 21.00</span>
            </div>
          </div>
        </div>
        <div className='mt-20 md:mt-0 border-4 shadow-md border-indigo-100 rounded-lg  shadow-indigo-300'>
          <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A8545ac57666bd5dfb3b2b0e034d09d139050cbabcc39eba0a8b5dfd2db6035ed&amp;source=constructor" className='w-full h-full min-h-[500px]' frameBorder="0"></iframe>
        </div>
      </section>
    </MainLayout>
  )
}

export default About