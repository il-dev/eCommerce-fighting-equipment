import React from "react";
import Layout from "../components/layout/Layout";
import AsideNav from "../components/layout/AsideNav";
import AsideRight from "../components/layout/AsideRight";
import BrandSlider from "../components/BrandSlider";

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
              <h1>Как оплатить?</h1>
              <div className="content__text">
                <p>
                  Для удобства наших клиентов мы предлагаем различные способы
                  оплаты заказов.
                </p>
                <p>
                  <strong>Способы оплаты:</strong>
                </p>
                <p>
                  • <strong>Оплата наличными</strong> курьеру при доставке по
                  Киеву или в магазинах: «<strong>EVERLAST</strong>» (г. Киев,
                  ТЦ «Олимпийский») или «<strong>MyFight</strong>» (Киев, ул.
                  Архитектора Городецкого, 12/3).
                </p>
                <p>
                  • <strong>Оплата </strong>с помощью платежных карт
                  <strong>Visa</strong>, <strong>MasterCard </strong>при
                  оформлении заказа на сайте.
                </p>
                <p>
                  • <strong>Система «Приват 24»</strong> или
                  <strong>терминалы самообслуживания «Приватбанк»</strong>:
                  карта Приватбанка в гривне
                  <strong>5363 5423 0622 6565</strong>. Обратите внимание в поле
                  «<strong>НАЗНАЧЕНИЕ ПЛАТЕЖА</strong>» нужно
                  <strong> указывать номер заказа</strong>.
                </p>
                <p>
                  • <strong>Оплата через отделение банка</strong> – распечатать
                  или переписать реквизиты заполненной квитанции для оплаты,
                  которая появляется после оформления заказа. Обратите внимание
                  на правильность заполнения поля «
                  <strong>назначение платежа</strong>», там должен
                  <strong>обязательно указываться номер заказа</strong>.
                </p>
                <p>
                  • <strong>Наложенный платеж</strong> – оплата заказа наличными
                  при получении (комиссия «Новой почты» составляет от 2% до 5%
                  от суммы заказа).
                </p>
                <p>
                  • <strong>Оплата</strong> через <strong>WEBMONEY</strong> –
                  может осуществляться в гривнах, рублях, долларах США с Вашего
                  электронного кошелька. Номер кошелька WEBMONEY в гривнах:
                  <strong>U157942048272</strong>. Обязательно сообщите нам любым
                  способом о произведенной оплате.
                </p>
                <p>
                  • <strong>Юридическое лицо</strong> - по запросу выставим
                  счет-фактуру на оплату по безналичному расчету.
                </p>
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
