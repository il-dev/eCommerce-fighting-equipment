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
              <h1>Наши клиенты</h1>
              <div className="content__text clients">
                <div className="clients-item">
                  <div className="clients-item__img">
                    <img src="/static/img/clients/original_5624a6424b6da.jpg" />
                  </div>
                  <div className="clients-item__text">
                    Давид Табатадзе, <br />
                    боксер
                  </div>
                </div>
                <div className="clients-item">
                  <div className="clients-item__img">
                    <img src="/static/img/clients/original_5624a8d82488d.jpg" />
                  </div>
                  <div className="clients-item__text">
                    Рустам Худжамов,
                    <br />
                    футболист ФК "Шахтер",
                    <br />
                    ФК "Металлист"
                  </div>
                </div>
                <div className="clients-item">
                  <div className="clients-item__img">
                    <img src="/static/img/clients/original_5638eaf8661f9.jpg" />
                  </div>
                  <div className="clients-item__text">
                    Виктор Акшонов,
                    <br />
                    многократный победитель
                    <br />
                    и призер перввентств СССР
                    <br />
                    по боксу
                  </div>
                </div>
                <div className="clients-item">
                  <div className="clients-item__img">
                    <img src="/static/img/clients/original_5638f19d55d16.jpg" />
                  </div>
                  <div className="clients-item__text">
                    Вячеслав Бульковский,
                    <br />
                    боксер и выдающийся ювелир
                  </div>
                </div>
                <div className="clients-item">
                  <div className="clients-item__img">
                    <img src="/static/img/clients/original_5638eaf87921c.jpg" />
                  </div>
                  <div className="clients-item__text">
                    Михаил Завьялов,
                    <br />
                    Президент лиги
                    <br />
                    профессионального бокса
                    <br />
                    Украины
                  </div>
                </div>
                <div className="clients-item">
                  <div className="clients-item__img">
                    <img src="/static/img/clients/original_5638eaf87935b.jpg" />
                  </div>
                  <div className="clients-item__text">
                    Олег Кудеров,
                    <br />
                    Судья международной категории
                    <br />
                    по боксу
                  </div>
                </div>
                <div className="clients-item">
                  <div className="clients-item__img">
                    <img src="/static/img/clients/original_5638eaf8794a5.jpg" />
                  </div>
                  <div className="clients-item__text">
                    Александр Усик и его тренер <br />
                    Сергей Ватаманюк
                  </div>
                </div>
                <div className="clients-item">
                  <div className="clients-item__img">
                    <img src="/static/img/clients/original_5638eaf87964e.jpg" />
                  </div>
                  <div className="clients-item__text">
                    Эльбрус Тедеев,
                    <br />
                    Олимпийский чемпион,
                    <br />
                    Чемпион Европы
                    <br />и мира по вольной борьбе
                  </div>
                </div>
                <div className="clients-item">
                  <div className="clients-item__img">
                    <img src="/static/img/clients/original_5638eaf879a9a.jpg" />
                  </div>
                  <div className="clients-item__text">
                    Сергей Михалок,
                    <br />
                    музыкант, боксер-любитель
                  </div>
                </div>
                <div className="clients-item">
                  <div className="clients-item__img">
                    <img src="/static/img/clients/original_5638f6861a228.jpg" />
                  </div>
                  <div className="clients-item__text">
                    Увайс Байсангуров,
                    <br />
                    Заслуженный тренер по боксу
                  </div>
                </div>
                <div className="clients-item">
                  <div className="clients-item__img">
                    <img src="/static/img/clients/original_5638eaf879d02.jpg" />
                  </div>
                  <div className="clients-item__text">
                    Хасан Байсангуров,
                    <br />
                    боксер
                  </div>
                </div>
                <div className="clients-item">
                  <div className="clients-item__img">
                    <img src="/static/img/clients/original_5638eaf879e62.jpg" />
                  </div>
                  <div className="clients-item__text">
                    Юрий Копцев,
                    <br />
                    Международный арбитр,
                    <br />
                    рефери Всемирного
                    <br />
                    совета по бокса
                  </div>
                </div>
                <div className="clients-item">
                  <div className="clients-item__img">
                    <img src="/static/img/clients/original_5638eaf879fa3.jpg" />
                  </div>
                  <div className="clients-item__text">
                    Яго Киладзе,
                    <br />
                    боксер-профессионал
                  </div>
                </div>
                <div className="clients-item">
                  <div className="clients-item__img">
                    <img src="/static/img/clients/original_5638f19d59191.jpg" />
                  </div>
                  <div className="clients-item__text">
                    Дмитрий Мадулу, <br />
                    боксер-профессионал, тренер
                  </div>
                </div>
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
