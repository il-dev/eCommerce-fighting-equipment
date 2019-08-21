import React from "react";
import Link from "next/link";
import { formBody } from "../helpers/";
import Layout from "../components/layout/Layout";
import AsideNav from "../components/layout/AsideNav";
import AsideRight from "../components/layout/AsideRight";
import Filter from "../components/filter/Filter";
import SliderMain from "../components/Slider";
import fetch from "isomorphic-fetch";
import { sliderMapped } from "../helpers/";

class MainPage extends React.Component {
  static async getInitialProps({ req }) {
    const params = {
      action: "getSlider",
      responce_type: "json",
      site: "1"
    };
    const res = await fetch("https://everlast.scud.com.ua/api/", {
      method: "post",
      body: formBody(params),
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Accept: "application/json, application/xml, text/plain, text/html, *.*"
      })
    });
    const json = await res.json();
    const slidesData = sliderMapped(json.result);

    return { slides: slidesData };
  }

  render() {
    return (
      <Layout>
        <div className="content container main-page">
          <aside className="sidebar-left">
            <AsideNav />
            <Filter />
          </aside>
          <main className="main">
            <SliderMain slides={this.props.slides} />
            <section className="main-texts">
              <div className="main-text">
                <h2 className="main-text__title">
                  У НАС ЛУЧШИЕ ТОВАРЫ ДЛЯ БОКСА, ЕДИНОБОРСТВ И ММА!
                </h2>
                <p className="main__text">
                  Наша компания являлась первой в Украине, организовавшей
                  узкоспециализированный магазин и интернет-магазин товаров для
                  бокса и контактных видов единоборств (ММА), что на начало
                  нашей деятельности в этом направлении (2003 год) было
                  уникальным явлением для рынка Украины. В настоящее время,
                  несмотря на конкуренцию, мы констатируем – мы были первыми, и
                  остаемся лучшими! Наша команда является профессионалами в
                  своей сфере. Нам доверяют покупатели уже более пятнадцати лет.
                  У нас вы найдете только КАЧЕСТВЕННЫЙ и ОРИГИНАЛЬНЫЙ товар –
                  никаких подделок! Наиболее удачные и проверенные модели
                  боксерских перчаток и перчаток для ММА, защитные капы, шлемы,
                  боксерки и борцовки, кожаные груши и другое снаряжение для
                  бокса и ММА. Форма и спортивная одежда таких марок как
                  EVERLAST, TITLE, VENUM, ADIDAS – это класcика бойцовского
                  стиля. Все это можно увидеть и купить в нашем магазине.
                </p>
              </div>
              <div className="main-text">
                <h1 className="main-text__title">
                  МАГАЗИН EVERLAST-ORIGINAL - ОФИЦИАЛЬНЫЙ ПРЕДСТАВИТЕЛЬ ЛУЧШИХ
                  СПОРТИВНЫХ БРЕНДОВ
                </h1>
                <p className="main__text">
                  <strong>
                    Мы являемся прямыми дистрибьюторами многих лучших торговых
                    марок товаров для бокса и ММА:&nbsp;
                  </strong>
                  EVERLAST, CLETO REYES, RIVAL, RINGSIDE, TITLE, VENUM, PRO MEX,
                  TWINS, FAIRTEX, SHOCK DOCTOR, FIGHTING SPORTS, NIKE и др. Мы
                  поставляем товар исключительно напрямую от производителей, и
                  только по прямым договорам, поэтому в аутентичности товара мы
                  уверены и гарантируем это! В ассортименте нашего магазина вы
                  можете найти самые последние и лучшие мировые разработки в
                  области экипировки и снаряжения, а также модные образцы
                  спортивной и тренировочной одежды. <br />
                  <br />В магазине everlast-original.com.ua собраны элементы
                  экипировки от большинства всемирно известных брендов. Причем,
                  как отмечалось выше, основной критерий отбора – это качество.
                  Премиум-сегмент экипировки и снаряжения составляет
                  значительную часть нашей коллекции. Но мы так же уделяем
                  внимание бюджетному и среднему ценовым сегментам: опять же –
                  наш выбор наилучшие, проверенные модели. Большинство наших
                  моделей «проверены в бою» или на тренировках нашими клиентами
                  или друзьями – бойцами ТОП-уровня, успешно выступавших и
                  выступающих на международной арене, участниками и медалистами
                  Олимпийских игр, чемпионатов мира и Европы. Мы всегда
                  прислушиваемся и стараемся получить отзыв непосредственно от
                  спортсменов, «работающих» с тем или иным элементом экипировки
                  или снаряжения.
                </p>
              </div>
              <div className="main-text">
                <h2 className="main-text__title">
                  ПОКУПКИ В МАГАЗИНЕ ЭКИПИРОВКИ ДЛЯ БОКСА, ЕДИНОБРСТВ И ММА
                </h2>
                <p className="main__text">
                  Мы стараемся предоставить максимально полный сервис при
                  покупке в нашем интернет-магазине. Оплатить товар вы сможете
                  практически любым удобным способом, а доставка будет
                  осуществлена в кратчайшие сроки в любое место на территории
                  Украины! Кроме того, в нашем интернет-магазине работает
                  компьютеризированная система, отражающая наличие товара на
                  складе, т.е. иными словами: вы видите только тот товар,
                  который имеется в настоящее время в наличии.
                  <br />
                  <br /> Еще одним важный аспектом работы с нами является то,
                  что вам всегда четко ответят на все вопросы относительно
                  товара и дадут профессиональные рекомендации (если вам они,
                  конечно, нужны). Боксерские бинты и капы, снарядные и
                  тренировочные перчатки для бокса и ММА, тяжелые мешки и
                  пневматические груши, водоналивные и напольные мешки, лапы
                  тренера и макивары, скакалки и костюмы для сгонки веса,
                  боксерки и борцовки, любые виды защит: защита головы, бандажи,
                  защиты голени, тренировочная одежда и форма для выступлений, в
                  общем, все, что нужно для ваших тренировок и соревнований, на
                  любой вкус и кошелек!
                  <br />
                  <strong>
                    У нас можно приобрести такие зарекомендовавшие себя товары
                    как:
                  </strong>
                </p>
                <ul className="main-page-ul__links">
                  <li>
                    <Link
                      href={{
                        pathname: "/Catalog",
                        query: {
                          id: "/shop/trenirovochnye-perchatki-127/"
                        }
                      }}
                      as="/shop/trenirovochnye-perchatki-127/"
                    >
                      <a href="/shop/trenirovochnye-perchatki-127/">
                        Тренировочные перчатки для бокса
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/Catalog",
                        query: { id: "/shop/bokserki-i-borcovki-110/" }
                      }}
                      as="/shop/bokserki-i-borcovki-110/"
                    >
                      <a href="/shop/bokserki-i-borcovki-110/">
                        Боксерки и борцовки
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/Catalog",
                        query: { id: "/shop/bokserskie-shlemy-106/" }
                      }}
                      as="/shop/bokserskie-shlemy-106/"
                    >
                      <a href="/shop/bokserskie-shlemy-106/">
                        Боксерские шлемы
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/Catalog",
                        query: { id: "/shop/bokserskie-binty-108/" }
                      }}
                      as="/shop/bokserskie-binty-108/"
                    >
                      <a href="/shop/bokserskie-binty-108/">Боксерские бинты</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/Catalog",
                        query: { id: "/shop/bokserskie-meshki-i-grushi-111/" }
                      }}
                      as="/shop/bokserskie-meshki-i-grushi-111/"
                    >
                      <a href="/shop/bokserskie-meshki-i-grushi-111/">
                        Пневматические груши
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/Catalog",
                        query: { id: "/shop/kapy-107/" }
                      }}
                      as="/shop/kapy-107/"
                    >
                      <a href="/shop/kapy-107/">Капы</a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/Catalog",
                        query: { id: "/shop/kompressionnaya-odezhda-138/" }
                      }}
                      as="/shop/kompressionnaya-odezhda-138/"
                    >
                      <a href="/shop/kompressionnaya-odezhda-138/">
                        Компрессионная одежда и рашгарды
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{
                        pathname: "/Catalog",
                        query: { id: "/shop/dlya-mma-250/" }
                      }}
                      as="/shop/dlya-mma-250/"
                    >
                      <a href="/shop/dlya-mma-250/">Шорты для ММА</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </section>
          </main>
          <aside className="sidebar-right">
            <AsideRight />
          </aside>
        </div>
      </Layout>
    );
  }
}

export default MainPage;
