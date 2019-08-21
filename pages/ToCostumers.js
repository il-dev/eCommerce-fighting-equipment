import React from "react";
import Layout from "../components/layout/Layout";
import AsideNav from "../components/layout/AsideNav";
import AsideRight from "../components/layout/AsideRight";
import BrandSlider from "../components/BrandSlider";
import Link from "next/link";

export default class Delivery extends React.Component {
  render() {
    return (
      <Layout>
        <div>
          <section className="category-brands container">
            <BrandSlider />
          </section>
          <div className="content container">
            <aside className="sidebar-left">
              <AsideNav />
            </aside>
            <main className="static-page">
              <h1>Покупателям</h1>
              <div className="content__text to-costumers">
                <Link
                  href={{ pathname: `/HowToOrder` }}
                  as={`/page/howto-order/`}
                >
                  <a href="/page/howto-order/">Как заказать?</a>
                </Link>
                <Link href={{ pathname: `/HowToPay` }} as={`/page/howto-pay/`}>
                  <a href="/page/howto-pay/"> Как оплатить?</a>
                </Link>
                <Link
                  href={{ pathname: `/Delivery` }}
                  as={`/page/howto-deliver/`}
                >
                  <a href="/page/howto-deliver/">Доставка</a>
                </Link>
                <Link
                  href={{ pathname: `/HowToSize` }}
                  as={`/page/howto-size/`}
                >
                  <a href="/page/howto-size/">Подобрать размер</a>
                </Link>
                <Link href={{ pathname: `/Warranty` }} as={`/page/garantiya/`}>
                  <a href="/page/garantiya/">Гарантия</a>
                </Link>
                <Link
                  href={{ pathname: `/Rules` }}
                  as={`/page/pravila-ispolzovaniya-produkcii/`}
                >
                  <a href="/page/pravila-ispolzovaniya-produkcii/">
                    Правила использования продукции
                  </a>
                </Link>
              </div>
            </main>
            <aside className="sidebar-right">
              <AsideRight />
            </aside>
          </div>
        </div>
      </Layout>
    );
  }
}
