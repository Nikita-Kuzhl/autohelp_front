import React from "react";
import { Link } from "react-router-dom";


const Benefits = [
  { id: "1", src: '/images/icon1.png', title: 'Полный спектр услуг по кузовному ремонту', desc: 'Кроме того, у нас можно заказать запчасти для иномарок и отечественных автомобилей' },
  { id: "2", src: '/images/icon2.png', title: 'Высокая квалификация мастеров', desc: 'Специалисты нашего сервиса – профессионалы с опытом работы более 10 лет в сфере покраски и ремонта авто' },
  { id: "3", src: '/images/icon3.png', title: 'Профессиональное оборудование', desc: 'Мы используем только профессиональное оборудование и линейки материалов от ведущих мировых производителей' },
  { id: "4", src: '/images/icon5.png', title: 'Гарантия на работу', desc: 'Мы предоставляем гарантию 6 месяцев на выполненную работу, так как наши специалисты ответственно относятся к своим обязанностям и качественно их выполняют' },
  { id: "5", src: '/images/icon7.png', title: 'Честные цены', desc: 'Согласованная с вами цена на покраску и кузовные работы останется неизменной — без дополнительных затрат и наценок на детали.' },
  { id: "6", src: '/images/icon8.png', title: 'Всегда точно в срок', desc: 'Мы всегда заканчиваем все работы точно в оговоренный срок, и никак иначе.' },
]

export default function Carousel() {
  return (
    <div className="md:mx-10">
      <div className=" bg-cover mt-10 bg-main-carousel shadow-2xl shadow-indigo-100  brightness-100 md:rounded-xl bg-no-repeat h-96 ">
        <div className="text-center relative top-1/3">
          <p className="text-white text-3xl font-bold leading-tight">Инновационный автосервис AutoHelp</p>
          <p className="text-white italic text-xl font-bold leading-tight">Многолетний опыт и гаратия качества</p>
          <Link
            to='/category'
            type="submit"
            className="group mt-5 shadow-md shadow-indigo-300   py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Посмотреть услуги
          </Link>
        </div>
      </div>
      <div className="container content-center">
        <section className="flex flex-col justify-center antialiased text-gray-200 mt-40 mb-20">
          <div className="max-w-6xl mx-auto p-4 sm:px-6 h-full">
            <article className="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
              <a className="relative block group" href="#0">
                <div className="absolute inset-0 bg-indigo-600 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none" aria-hidden="true" />
                <figure className="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
                  <img className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out" src='/images/image_01.jpg' width={540} height={303} alt="Blog post" />
                </figure>
              </a>
              <div>
                <header >
                  <div className="mb-3">
                    <ul className="flex flex-wrap text-xs font-medium -m-1">
                      <div className="m-1">
                        <h1 className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-indigo-300 hover:bg-indigo-500 transition duration-150 ease-in-out" >Скорость</h1>
                      </div>
                      <div className="m-1">
                        <h1 className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-indigo-500 hover:bg-indigo-600 transition duration-150 ease-in-out">Качество</h1>
                      </div>
                    </ul>
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold leading-tight mb-2">
                    <h1 className="hover:text-gray-500 text-gray-900 transition duration-150 ease-in-out" >Коротко об автосервисе</h1>
                  </div>
                </header>
                <p className="text-lg text-gray-600 flex-grow">AutoHelp — ваш надежный автосервис во Владимире. Мы принимаем иномарки и отечественные авто. Выполняем широкий спектр работ по ремонту и обслуживанию автомобилей. К вашим услугам — квалифицированные мастера с многолетним опытом. Автосервисы укомплектованы современным оборудованием.</p>
              </div>
            </article>
          </div>
        </section>
        <section className="container bg-indigo-300  bg-gradient-to-r from-indigo-500 rounded-lg border border-indigo-200 shadow-lg shadow-indigo-200 py-10 my-10">
          <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-2 text-center ">
            <p className=" text-white transition " >Преимущества</p>
          </h3>
          <section className="grid md:grid-cols-2  mx-10">
            {Benefits.map(item => (
              <figure key={item.id} className="mt-10 hover:-translate-y-1 hover:scale-110 delay-200 duration-300 transition text-center ease-in">
                <img alt={item.id} width={60} height={60} src={item.src} className="mx-auto" />
                <h3 className="text-xl text-white font-bold">{item.title}</h3>
                <h3 className="text-md text-white whitespace-pre-line md:mx-20">{item.desc}</h3>
              </figure>
            ))}

          </section>
        </section>
      </div>

    </div>
  );
}
