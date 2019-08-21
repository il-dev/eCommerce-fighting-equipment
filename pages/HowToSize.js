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
              <h1>Подобрать размер</h1>
              <div className="content__text">
                <h3>
                  Как подобрать размер обуви, одежды, экипировки и снаряжения?
                </h3>
                <p>
                  <strong>Как определить размер руки?</strong>
                </p>
                <p>
                  <img
                    alt="Размер руки"
                    src="/static/img/original_54887ecb4a970.jpg"
                  />
                </p>
                <p>
                  <strong>
                    Обратите внимание на то, что американские размеры на размер
                    больше европейских.
                  </strong>
                </p>
                <p>
                  <strong>Как правильно определить размер?</strong>
                  <br />
                  Перед оформления заказа в интернет-магазине просим Вас
                  руководствоваться рекомендациями по подбору размеров.
                  Определяющими мерками для женщин являются: рост, обхват груди
                  и обхват бедер, для мужчин: рост, обхват груди и обхват талии
                  соответственно.
                </p>
                <ul>
                  <li>
                    <strong>Рост</strong>
                    <br />
                    Рост необходимо измерить по вертикали: расстояние от пола до
                    самой верхней точки макушки.
                  </li>
                  <li>
                    <strong>Обхват груди</strong>
                    <br />
                    Измерительная лента должна проходить горизонтально вокруг
                    туловища через выступающие точки грудных желез и замыкаться
                    на правой стороне груди.
                  </li>
                  <li>
                    <strong>Обхват талии</strong>
                    <br />
                    Измерительная лента должна проходить горизонтально вокруг
                    туловища на уровне талии (самого узкого места). Для больших
                    размеров уровень талии приблизительно определяют, положив
                    руки таким образом, чтобы мизинцы лежали на самых
                    выступающих частях тазобедренной кости спереди. На уровне
                    указательных пальцев приблизительно и находится талия.
                  </li>
                  <li>
                    <strong>Обхват бедер</strong>
                    <br />
                    Измерительная лента должна проходить горизонтально вокруг
                    туловища, через самые выступающие точки ягодиц.
                  </li>
                </ul>
                <p>
                  <strong>ОДЕЖДА</strong>
                </p>
                <p>
                  Определяющими размерами для женщин являются: рост, обхват
                  груди и обхват бедер, для мужчин: рост, обхват груди и обхват
                  талии соответственно.
                  <br />
                  <br />
                  <strong>Рост:</strong> необходимо измерить по вертикали:
                  расстояние от пола до самой верхней точки макушки.
                  <br />
                  <br />
                  <strong>Обхват груди:</strong> измерительная лента должна
                  проходить горизонтально вокруг туловища через выступающие
                  точки грудных желез и замыкаться на правой стороне груди.
                  <br />
                  <br />
                  <strong>Обхват талии:</strong> измерительная лента должна
                  проходить горизонтально вокруг туловища на уровне талии
                  (самого узкого места). Для больших размеров уровень талии
                  приблизительно определяют, положив руки таким образом, чтобы
                  мизинцы лежали на самых выступающих частях тазобедренной кости
                  спереди. На уровне указательных пальцев приблизительно и
                  находится талия.
                  <br />
                  <br />
                  <strong>Обхват бедер:</strong> измерительная лента должна
                  проходить горизонтально вокруг туловища, через самые
                  выступающие точки ягодиц.
                </p>
                <p />
                <p>
                  <strong>Таблица размеров женской одежды </strong>
                </p>
                <table border="0" cellPadding="0">
                  <tbody>
                    <tr>
                      <td style={{ width: "157px" }}>
                        <p>Размер американский</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>S</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>M</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>L</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>XL</p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "157px" }}>
                        <p>Рос</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>170-176</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>176</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>176-182</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>182</p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "157px" }}>
                        <p>Обхват груди</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>88-92</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>92-96</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>100-104</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>104</p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "157px" }}>
                        <p>Обхват бедер</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>92-96</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>96-100</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>104-108</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>108</p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "157px" }}>
                        <p>Соответствие размеров</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>44-46</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>46-48</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>50-52</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>Свыше 52</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p />
                <p>
                  <strong>Таблица размеров мужской одежды</strong>
                </p>
                <table border="0" cellPadding="0">
                  <tbody>
                    <tr>
                      <td style={{ width: "155px" }}>
                        <p>Размер американский</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>M</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>L</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>XL</p>
                      </td>
                      <td style={{ width: "109px" }}>
                        <p>XXL</p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "155px" }}>
                        <p>Рост</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>170-182</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>182</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>188</p>
                      </td>
                      <td style={{ width: "109px" }}>
                        <p>188</p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "155px" }}>
                        <p>Обхват груди</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>92-106</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>106-116</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>116-126</p>
                      </td>
                      <td style={{ width: "109px" }}>
                        <p>Свыше 126</p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "155px" }}>
                        <p>Обхват талии</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>80-96</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>96-106</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>106-116</p>
                      </td>
                      <td style={{ width: "109px" }}>
                        <p>Свыше 116</p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "155px" }}>
                        <p>Соответствие размеров</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>46-50</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>52-54</p>
                      </td>
                      <td style={{ width: "85px" }}>
                        <p>54-56</p>
                      </td>
                      <td style={{ width: "109px" }}>
                        <p>Свыше 58</p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p />

                <p>
                  <strong>Размеры ладоней для подбора перчаток:</strong>
                </p>

                <p />

                <p />

                <p>
                  <strong>СООТВЕТСТВИЕ ВЕСОВ:</strong>
                </p>

                <p>1 унция (1 oz) = 28,35 гр</p>

                <p>1 фунт (1 ft) – 453,6 гр</p>

                <p />

                <p>
                  <strong>СООТВЕТСТВИЕ ДЛИН:</strong>
                </p>

                <p>1 дюйм (1”) – 2,54 см</p>

                <p>1 фут (1’) – 30.48 см</p>
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
