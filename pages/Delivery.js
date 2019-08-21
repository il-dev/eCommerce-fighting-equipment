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
              <h1>Доставка и оплата</h1>
              <div className="content__text">
                <h2>Доставка</h2>
                <p>
                  <span>
                    Для удобства наших клиентов мы предлагаем различные способы
                    доставки заказов.
                  </span>
                </p>
                <p>
                  <strong>Способы доставки:</strong>
                </p>
                <p>
                  <strong>Мы предлагаем различные способы доставки:</strong>
                </p>
                <p>
                  <strong>Киев:</strong>
                </p>
                <p>
                  •<strong>Самовывоз в Киеве.</strong>Заказ в течение трех дней
                  можно забрать в наших магазинах: «<strong>MyFight</strong>»
                  (г. Киев, ул. Городецкого 12/3) или «<strong>EVERLAST</strong>
                  » (г. Киев, ТЦ «Олимпийский»)
                </p>
                <p>
                  •<strong>Доставка курьером по г. Киеву</strong>. Стоимость
                  доставки – 70 грн. Доставка осуществляется в течение 1-2 дней.
                </p>
                <p>
                  <br />
                  <strong>Вся Украина:</strong>
                </p>
                <p>
                  •<strong>Доставка на склад «Новая Почта»</strong>(список
                  городов в которые осуществляется доставка
                  <a href="http://novaposhta.ua/uk/office" target="_blank">
                    см. здесь
                  </a>
                  ). Срок доставки - 1-2 дня. Средняя стоимость доставки по
                  Украине - 25 грн. Доставку оплачивает покупатель по тарифам
                  «Новой почты».
                </p>
                <p>
                  •
                  <strong>
                    Доставка «из рук в руки» курьером «Новая Почта»
                  </strong>
                  (список городов в которые осуществляется доставка
                  <a href="http://novaposhta.ua/uk/office" target="_blank">
                    см. здесь
                  </a>
                  ). Заказ доставляется по Вашему адресу лично Вам в руки. Срок
                  доставки - 1-2 дня. Средняя стоимость доставки по Украине - 50
                  грн. Доставку оплачивает покупатель по тарифам «Новой почты».
                </p>
                <p>
                  *Стоимость доставки крупногабаритных товаров или оптовых
                  партий рассчитывается индивидуально.
                </p>
                <h2>Оплата</h2>
                <p>
                  Для удобства наших клиентов мы предлагаем различные способы
                  оплаты заказов.
                </p>
                <p>
                  <strong>Способы оплаты:</strong>
                </p>
                <p>
                  •<strong>Оплата наличными</strong>курьеру при доставке по
                  Киеву или в магазинах:«<strong>EVERLAST</strong>» (г. Киев, ТЦ
                  «Олимпийский»)или «<strong>MyFight</strong>» (Киев, ул.
                  Архитектора Городецкого, 12/3).
                </p>
                <p>
                  •<strong>Оплата</strong>с помощью платежных карт
                  <strong>Visa</strong>,<strong>MasterCard</strong>при
                  оформлении заказа на сайте.
                </p>
                <p>
                  •<strong>Система «Приват 24»</strong>или
                  <strong>терминалы самообслуживания «Приватбанк»</strong>:
                  карта Приватбанка в гривне<strong>5363 5423 0622 6565</strong>
                  . Обратите внимание в поле «
                  <strong>НАЗНАЧЕНИЕ ПЛАТЕЖА</strong>» нужно
                  <strong>указывать номер заказа</strong>.
                </p>
                <p>
                  •<strong>Оплата через отделение банка</strong>– распечатать
                  или переписать реквизиты заполненной квитанции для оплаты,
                  которая появляется после оформления заказа. Обратите внимание
                  на правильность заполнения поля «
                  <strong>назначение платежа</strong>», там должен
                  <strong>обязательно указываться номер заказа</strong>.
                </p>
                <p>
                  •<strong>Наложенный платеж</strong>– оплата заказа наличными
                  при получении (комиссия «Новой почты» составляет от 2% до 5%
                  от суммы заказа).
                </p>
                <p>
                  •<strong>Оплата</strong>через<strong>WEBMONEY</strong>– может
                  осуществляться в гривнах, рублях, долларах США с Вашего
                  электронного кошелька. Номер кошелька WEBMONEY в гривнах:
                  <strong>U157942048272</strong>. Обязательно сообщите нам любым
                  способом о произведенной оплате.
                </p>
                <p>
                  •<strong>Юридическое лицо</strong> - по запросу выставим
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
