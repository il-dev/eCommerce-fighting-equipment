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
              <div className="content__text">
                <h1>Правила использования продукции</h1>
                <p />
                <p>
                  <strong>Мешки боксерские</strong>
                </p>
                <p>
                  мешки предназначены для отработки ударов руками и ногами, не
                  допускаются удары по мешку посторонними предметами (палки,
                  биты и т.д.) Рекомендуется использовать защитную экипировку
                  при работе с мешком.
                  <strong>
                    Порывы, царапины, парезы не являются основаниями для
                    обращения по гарантии.
                  </strong>
                </p>
                <p>
                  <br />
                  ВНИМАНИЕ:
                  <br />
                  При транспортировке и/или подвеске мешка
                  <strong>
                    ЗАПРЕЩАЕТСЯ поднимать/крепить мешок за один из крепёжных
                    элементов
                  </strong>
                  (кольцо для цепи, одна цепь) все цепи должны быть закреплены
                  одновременно. НЕ ПРОВИСАТЬ на креплении.
                </p>
                <p>
                  <br />
                  <strong>Перчатки боксерские</strong>
                </p>
                <p>
                  предназначены для спаррингов, отработки ударов по боксерскому
                  мешку. Удары в перчатках по твердым поверхностям опасны для
                  здоровья и могут повлечь нарушение целостности материала
                  перчаток.
                  <br />
                </p>
                <p>
                  <strong>
                    Защитная экипировка (шлем, бандаж, защитный жилет, подушки
                    ударные, лапы)
                  </strong>
                </p>
                <p>
                  предназначены для защиты частей тела спортсмена от ударов
                  руками и ногами. Не допускается наносить удары посторонними
                  твёрдыми предметами, это опасно для здоровья и может повлечь
                  нарушение материала<strong>. </strong>
                </p>
                <p>
                  <br />
                  <strong>Обувь</strong>
                </p>
                <p>
                  предназначена для тренировок в зале или на улице в сухую
                  погоду. Требует ухода и чистки. Рекомендуется просушивать
                  после каждой тренировки.
                  <br />
                </p>
                <p>
                  <strong>Костюмы для сгонки веса</strong>
                </p>
                <p>
                  предназначены для сгона веса и обеспечения «эффекта сауны» при
                  тренировках .Следует быть аккуратнее при одевании костюма,
                  учивая что для получения эффекта сауны швы костюма спаяны, и
                  резкие движения могут стать причиной порыва.
                </p>
                <p>
                  <strong>
                    При неправильном использовании продукции, любые механические
                    повреждения, порывы, царапины, парезы не являются
                    основаниями для обращения по гарантии.
                  </strong>
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
