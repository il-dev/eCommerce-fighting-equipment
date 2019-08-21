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
              <h1>Контакты</h1>
              <div className="content__text">
                <p>
                  <strong>Интернет-магазин</strong>
                  <br />
                  (044) 227-86-19
                  <br />
                  <a href="mailto:info@everlast-original.com.ua">
                    info@everlast-original.com.ua
                  </a>
                </p>

                <p>
                  <strong>Оптово-розничный магазин в г.Киеве</strong>
                  <br />
                  (044) 22-111-77
                  <br />
                  <a href="mailto:sales@everlast-original.com.ua">
                    sales@everlast-original.com.ua
                  </a>
                </p>

                <h3>Мы в социальных сетях:</h3>

                <p>ЭКИПИРОВКА ДЛЯ БОКСА</p>

                <p>
                  <a
                    href="http://vk.com/everlast.original"
                    target="_blank"
                    className="social-link-contacts"
                  >
                    <img alt="vk.com" src="/static/img/pages/vk__32.png" />
                  </a>
                  <a
                    href="https://facebook.com/everlast.ukraine"
                    target="_blank"
                    className="social-link-contacts"
                  >
                    <img
                      alt="facebook.com"
                      src="/static/img/pages/fb__32.png"
                    />
                  </a>
                </p>

                <p>ОДЕЖДА С СИМВОЛИКОЙ УКРАИНЫ</p>

                <p>
                  <a
                    href="http://vk.com/public70138405"
                    target="_blank"
                    className="social-link-contacts"
                  >
                    <img alt="vk.com" src="/static/img/pages/vk__32.png" />
                  </a>
                  <a
                    href="https://facebook.com/odezhdasimvolika"
                    target="_blank"
                    className="social-link-contacts"
                  >
                    <img
                      alt="facebook.com"
                      src="/static/img/pages/fb__32.png"
                    />
                  </a>
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
