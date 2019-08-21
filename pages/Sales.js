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
              <h1>Скидки</h1>
              <div className="content__text sales-page">
                <p>
                  <strong>
                    Система скидок, действующая в наших магазинах:
                  </strong>
                </p>
                <ul>
                  <li>
                    <strong>Статус «Лояльный»</strong> - накопительная программа
                    скидок, не зависимо в каком из наших розничных или
                    интернет-магазинов Вы совершаете покупки: после покупок на
                    сумму более 5000 грн. - 5% скидки на все последующие
                    покупки.
                  </li>
                </ul>
                <p>
                  (При осуществлении покупки укажите свой действующий телефон и
                  ФИО).
                </p>
                <ul>
                  <li>
                    <strong>Статус «Постоянный клиент»</strong> - 5% скидки на
                    все покупки (данный статус закрепляется в обмен на карточку
                    постоянного клиента, выданную ранее). После покупок на сумму
                    более 10 000 грн. - 10% скидки на все последующие покупки.
                  </li>
                </ul>
                <p>
                  (При осуществлении покупки укажите свой действующий телефон и
                  ФИО).
                </p>
                <ul>
                  <li>
                    <strong>Статус «VIP клиент»</strong> - 10% скидки на все
                    покупки. Присваивается в каждом случае индивидуально.
                  </li>
                </ul>
                <p>
                  (При осуществлении покупки укажите свой действующий телефон и
                  ФИО).
                </p>
                <p>
                  Каждый статус закрепляется за покупателем на основании его
                  логина, который является действующим номером мобильного
                  телефона в формате: 0ХХ ХХХ ХХ ХХ.
                </p>
                <p>
                  При осуществлении покупок через интернет-магазин, необходимо
                  сначала зарегистрироваться на сайте, а впоследствии заходить
                  под своим логином: 0ХХ ХХХ ХХ ХХ и паролем, который вы
                  заводите самостоятельно при регистрации (мы рекомендуем в виде
                  пароля указывать фамилию).
                </p>
                <p>
                  При осуществлении покупок в одном из наших розничных магазинов
                  (<strong>«Everlast»</strong>, Киев, ул. Большая Васильковская,
                  72, ТЦ «Олимпийский» или <strong>«MyFight»</strong>, Киев, ул.
                  Арх. Городецкого, 12/3) Вы просто называете свой мобильный
                  номер телефона продавцу.
                </p>
                <Link
                  href={{ pathname: "/Coach" }}
                  as="/page/individualnoe-predlozhenie-dlya-trenerov/"
                >
                  <a
                    className="coach-link"
                    href="/page/individualnoe-predlozhenie-dlya-trenerov/"
                  >
                    Индивидуальное предложение для тренеров
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
