import React from "react";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import AsideNav from "../components/layout/AsideNav";
import AsideRight from "../components/layout/AsideRight";
import BrandSlider from "../components/BrandSlider";
export default class Shops extends React.Component {
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
              <div className="content__text">
                <h1>Магазины</h1>
                <h2>Магазин EVERLAST:</h2>
                <p>
                  <strong>г. Киев, ул. Большая Васильковская, д. 72</strong>
                  &nbsp; (метро «Олимпийская»), ТЦ Олимпийский, минус 1 этаж
                </p>
                <p>
                  <strong>Режим работы: </strong>с 10-00 до 20-00, без выходных
                </p>
                <p>
                  <strong>Контактный телефон:</strong> +38 (044) 22-111-77
                </p>
                <p>
                  <strong>Эл.почта:&nbsp;</strong>
                  <a
                    className="shops-link"
                    href="mailto:everlast2525@gmail.com"
                  >
                    everlast2525@gmail.com
                  </a>
                  <br />
                  <a
                    className="shops-link"
                    href="mailto:everlast.magazin@gmail.com"
                  >
                    everlast.magazin@gmail.com
                  </a>
                </p>
                <p>
                  Магазин <strong>EVERLAST-original</strong> - первый
                  специализированный магазин экипировки для бокса и единоборств
                  премиум класса! Наш магазин во многом уникальное явление для
                  Украины, в первую очередь из-за того, что мы являемся
                  действительно специализированным магазином, который предлагает
                  своим клиентам широчайший выбор экипировки и одежды от ведущих
                  мировых производителей индустрии единоборств.
                </p>
                <p>
                  В магазине собраны элементы экипировки от большинства всемирно
                  известных брендов! Мы очень придирчиво подходим к отбору
                  моделей, прежде всего, по отзывам бойцов и тренеров, имеющих
                  непосредственный опыт подготовки и выступлений на наивысшем
                  мировом уровне, как среди любителей, так и среди
                  профессионалов: мы можем утверждать, что наша продукция
                  «проверена в бою» и самых жестких тренировках при подготовке к
                  ним! Многие из наших клиентов - спортсмены, которые являются
                  (или были) чемпионами (призерами) Олимпийских игр, чемпионатов
                  мира и Европы, а также самых престижных профессиональных
                  организаций.
                </p>
                <p>
                  Розничный магазин <strong>EVERLAST-original</strong> – это
                  магазин, расположенный в самом центре Киева, просторный,
                  светлый, с удобной примерочной и приветливым профессиональным
                  персоналом.
                </p>
                <p>
                  Ну и конечно не стоит забывать о том, что в отличии от
                  большинства розничных магазинов, мы торгуем по ценам интернет
                  магазина, а часто и лучше!
                </p>
                <p>
                  <strong>EVERLAST-original</strong> идеально Вам подойдет,
                  если: Вы цените качество, цените свое здоровье, комфорт,
                  возможность выбора, выбираете лучшее, предпочитаете примерить
                  и сравнить, цените свое время и Вам нравится, когда к Вам и
                  Вашим деньгам относятся с уважением.
                </p>
                <p>
                  В магазин <strong>EVERLAST-original</strong> Вы всегда сможете
                  ознакомиться с лучшими моделями экипировки и одежды от самых
                  популярных брендов, таких как
                  <strong>
                    EVERLAST, TITLE, CLETO REYES, VENUM, PRO MEX, FIGHTING
                    SPORTS, TWINS, SHOCK DOCTOR, FAIRTEX, NIKE.
                  </strong>
                </p>
                <p>
                  Для постоянных покупателей,&nbsp;
                  <Link
                    href={{ pathname: "/Coach" }}
                    as="/page/individualnoe-predlozhenie-dlya-trenerov/"
                  >
                    <a
                      className="shops-link"
                      href="/page/individualnoe-predlozhenie-dlya-trenerov/"
                    >
                      тренеров
                    </a>
                  </Link>
                  , представителей спортклубов действует специальная дисконтная
                  программа.
                </p>
                <p>
                  <img
                    alt="EVERLAST Shop"
                    src="/static/img/pages/original_54887df999491.jpg"
                  />
                </p>
                <h3>Схема проезда:</h3>
                <p>
                  <img
                    alt="EVERLAST Map"
                    src="/static/img/pages/original_54887df9cb74f.jpg"
                  />
                </p>
                <h2>Магазин MyFight:</h2>
                <p>
                  <strong>г. Киев, ул. Архитектора Городецкого, д. 12/3</strong>
                  &nbsp; (метро «Хрещатик»)
                </p>
                <p>
                  <strong>Режим работы:</strong> с 10-00 до 19-00 (кроме сб. и
                  вс.)
                </p>
                <p>
                  <strong>Контактный телефон:</strong> +38 (044) 221-19-25
                </p>
                <p>
                  <strong>Эл. почта:&nbsp;</strong>&nbsp;
                  <a
                    className="shops-link"
                    href="mailto:everlast2525@gmail.com"
                  >
                    everlast2525@gmail.com
                  </a>
                </p>
                <p>
                  <img
                    alt="MyFight Shop"
                    src="/static/img/pages/MyFight_2000x700.jpg"
                  />
                </p>
                <p>
                  <img
                    alt="MyFight Shop"
                    src="/static/img/pages/Panoram-2.jpg"
                  />
                </p>
                <h3>Схема проезда:</h3>
                <p>
                  <img
                    alt="MyFight Shop Map"
                    src="/static/img/pages/map_MyFight.jpg"
                  />
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
