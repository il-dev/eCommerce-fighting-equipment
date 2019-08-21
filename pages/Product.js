import React from "react";
import Link from "next/link";
import "isomorphic-unfetch";
import Layout from "../components/layout/Layout";
import AsideNav from "../components/layout/AsideNav";
import InlineSVG from "svg-inline-react";
import {
  formBody,
  parseQuery,
  unescapeHtml,
  mapRating,
  clearOneProduct
} from "../helpers/";
import { prefixForSources } from "../constants";
import BrandSlider from "../components/BrandSlider";
import { connect } from "react-redux";
import { addToFavorites } from "../actions/favorite";
import { addToCart, openCart, setCart } from "../actions/cart";
import AddReview from "../components/AddReview";
import Modal from "react-modal";
import Filter from "../components/filter/Filter";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    minWidth: "300px",
    transform: "translate(-50%, -50%)",
    zIndex: "9999999"
  }
};
Modal.setAppElement("#__next");
class Product extends React.Component {
  static async getInitialProps({ query, ctx, req }) {
    // eslint-disable-next-line no-undef

    const params = {
      action: "getGoodsInSite",
      responce_type: "json",
      site: "1",
      article_id: parseQuery(query.id)
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
    const paramsForReview = {
      action: "getReview",
      responce_type: "json",
      site: "1",
      article_id: parseQuery(query.id)
    };
    const resForReview = await fetch("https://everlast.scud.com.ua/api/", {
      method: "post",
      body: formBody(paramsForReview),
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Accept: "application/json, application/xml, text/plain, text/html, *.*"
      })
    });
    const jsonForReview = await resForReview.json();
    let reviews = {};
    if (jsonForReview.result.length == 0) {
      reviews = { count: 0 };
    } else {
      reviews = jsonForReview.result;
    }

    //SET VRINGE STATISTIC
    if (query && query.src == "vringe.com") {
      await fetch("https://everlast.scud.com.ua/api/", {
        method: "post",
        body: `action=setStatistics&site=1&src=vringe.com`,
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*"
        })
      });
    }

    return {
      product: clearOneProduct(json.result.goods),
      reviews: reviews,
      productId: parseQuery(query.id),
      descriptionOrReview: query.descriptionOrReview ? false : true
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      goodsInCart: this.props.cart.goods || [],
      reviewModal: false,
      rating: [],
      descriptionOrReview: true,
      photoIsOpen: false,
      largePhotoSource: ""
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.cart.goods != state.goodsInCart)
      return { goodsInCart: props.cart.goods };
    return null;
  }
  handleAddToCart = id => {
    this.props.setCart(id);
    this.props.openCart();
  };
  openModal = () => {
    this.setState({ reviewModal: true });
  };

  closeModal = () => {
    this.setState({ reviewModal: false });
  };
  componentDidMount() {
    const goodsIds = Object.keys(this.props.product).map(item =>
      item.substring(1)
    );
    if (goodsIds.length == 0) return false;
    fetch("https://everlast.scud.com.ua/api/", {
      method: "post",
      body: `action=getRating&responce_type=json&site=1&goods_id=${JSON.stringify(
        goodsIds
      )}`,
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Accept: "application/json, application/xml, text/plain, text/html, *.*"
      })
    })
      .then(r => r.json())
      .then(data => {
        this.setState((prevState, props) => {
          return {
            ...prevState,
            rating: mapRating(data.result),
            descriptionOrReview: props.descriptionOrReview
          };
        });
      });
  }
  getProductOptions = () => {
    const productKey = Object.keys(this.props.product)[0];
    const { photoIsOpen, largePhotoSource } = this.state;
    const product = this.props.product[productKey].data_goods;
    const { link_article, name, article_id } = this.props.product[productKey];
    const { stores } = this.props;
    const productsByColor = {};
    Object.keys(product).forEach(key => {
      if (!productsByColor[product[key].color_id])
        productsByColor[product[key].color_id] = {};
      if (!productsByColor[product[key].color_id][product[key].size])
        productsByColor[product[key].color_id][product[key].size] = {};
      if (
        !productsByColor[product[key].color_id][product[key].size]["store_id"]
      )
        productsByColor[product[key].color_id][product[key].size][
          "store_id"
        ] = [];
      productsByColor[product[key].color_id][product[key].size][
        "store_id"
      ].push(product[key].store_id);
      productsByColor[product[key].color_id][product[key].size]["id"] =
        product[key].goods_id;
      productsByColor[product[key].color_id]["photo"] =
        product[key].photo.thumb;
      productsByColor[product[key].color_id]["largePhoto"] =
        product[key].photo.large;
      productsByColor[product[key].color_id]["color"] = product[key].color;
      productsByColor[product[key].color_id]["price"] = product[key].price;
    });
    return Object.keys(productsByColor).map(key => {
      const { photo, color, price, link, largePhoto } = productsByColor[key];
      return (
        <div
          className="product-options__item"
          key={key}
          id={`product-options__item_${key}`}
        >
          <div className="product-options__img">
            <img
              src={`${prefixForSources}${photo}`}
              onClick={() => {
                this.setState({
                  ...this.state,
                  photoIsOpen: true,
                  largePhotoSource: `${prefixForSources}${largePhoto}`
                });
              }}
            />
            {photoIsOpen && (
              <Lightbox
                mainSrc={largePhotoSource}
                onCloseRequest={() => this.setState({ photoIsOpen: false })}
              />
            )}
          </div>
          <div className="product-options-descr">
            <div className="product-table">
              <div className="product-table__title">
                <div className="product-table__col-name">Цвет</div>
                <div className="product-table__col-name">Размер</div>
                <div className="product-table__col-name">Наличие</div>
              </div>
              {/*   <!-- ОДНА СТРОКА В ТАБЛИЦЕ ТОВАРОВ -->  */}
              {Object.keys(productsByColor[key]).map(sizeKey => {
                if (
                  sizeKey == "photo" ||
                  sizeKey == "color" ||
                  sizeKey == "price" ||
                  sizeKey == "link" ||
                  sizeKey == "largePhoto"
                )
                  return false;
                return (
                  <div className="product-table-values" key={sizeKey}>
                    <div className="product-table__value">{color}</div>
                    <div className="product-table__value">
                      {unescapeHtml(sizeKey)}
                    </div>
                    <div className="product-table__value product-table__value_stores">
                      {productsByColor[key][sizeKey].store_id.map(item => {
                        return (
                          <span
                            key={key + sizeKey + item}
                            className="storeStock"
                          >
                            {stores[item].store_icon}
                            <span className="tooltiptext">
                              <span className="tooltip-title">
                                Есть в наличии
                              </span>
                              {`${unescapeHtml(
                                stores[item].name
                              )} ${unescapeHtml(stores[item].address)}`}
                            </span>
                          </span>
                        );
                      })}
                    </div>
                    <div className="product-table__value product-table__value-buttons">
                      <div className="product-options-buttons">
                        <button
                          type="button"
                          className="product-options__wish"
                          onClick={() => {
                            this.handleAddToFavorites(article_id);
                          }}
                        >
                          <InlineSVG
                            src={`<svg class="icon-wish" data-name="icon-wish" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.76 27.48"><defs><style>.icon-wish{fill:none;stroke:#b19354;stroke-linecap:square;stroke-miterlimit:10;stroke-width:1.5px;}</style></defs><path class="icon-wish" d="M8.2.75A7.45,7.45,0,0,0,2.93,13.47l13,13,13-13A7.45,7.45,0,0,0,18.29,2.93L15.88,5.35,13.47,2.93A7.4,7.4,0,0,0,8.2.75Z"></path></svg>`}
                          />
                        </button>
                        {this.props.cart.goods &&
                        this.props.cart.goods.length > 0 &&
                        this.props.cart.goods.some(item => {
                          return (
                            item.goods_id == productsByColor[key][sizeKey].id
                          );
                        }) ? (
                          <button
                            type="button"
                            className="product-options__buy product-options__buy-disabled"
                            disabled
                          >
                            Товар в корзине
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="product-options__buy"
                            onClick={() => {
                              this.handleAddToCart(
                                productsByColor[key][sizeKey].id,
                                +price,
                                photo,
                                link_article,
                                name
                              );
                            }}
                          >
                            в корзину
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    });
  };
  getBreadcrumbs(categpryId, selfLink, selfName) {
    const breadcrumbs = this.props.breadcrumbs[categpryId];

    return (
      <ul className="breadcrumbs">
        {Object.keys(breadcrumbs).map((key, index) => {
          if (index == 0) {
            return (
              <li key={key}>
                <Link href={{ pathname: "/index" }} as={"/"}>
                  <a href="/">Главная</a>
                </Link>
              </li>
            );
          } else if (index == 1) {
            return (
              <li key={key}>
                <Link href={{ pathname: "/Catalog" }} as={`/shop/`}>
                  <a href="/shop/">Каталог</a>
                </Link>
              </li>
            );
          } else {
            return (
              <li key={key}>
                <Link
                  href={{
                    pathname: "/Catalog",
                    query: {
                      id: breadcrumbs[key].link
                    }
                  }}
                  as={breadcrumbs[key].link}
                >
                  <a href={breadcrumbs[key].link}>{breadcrumbs[key].name}</a>
                </Link>
              </li>
            );
          }
        })}
        <li>
          <a href={selfLink}>{unescapeHtml(selfName)}</a>
        </li>
      </ul>
    );
  }
  getReviews = () => {
    const { review } = this.props.reviews;
    if (!review) {
      return (
        <div className="tabs-content__item tabs-content-feedback active">
          <div className="review-wrapper">
            <p>Отзывов пока нет, будьте первым!</p>
            <button className="add-review__btn" onClick={this.setReview}>
              Оставить отзыв
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="tabs-content__item tabs-content-feedback active">
          {Object.keys(review).map(key => {
            return (
              <div className="product-feedback__item" key={review[key].id}>
                <div className="product-feedback__author">
                  {review[key].name}
                </div>
                <div className="product-feedback__text">
                  {review[key].review}
                </div>
              </div>
            );
          })}
          <div className="review-wrapper">
            <button className="add-review__btn" onClick={this.setReview}>
              Оставить отзыв
            </button>
          </div>
        </div>
      );
    }
  };
  setReview = () => {
    this.setState({ reviewModal: true });
  };
  handleDescriptionOrReview = () => {
    this.setState({ descriptionOrReview: !this.state.descriptionOrReview });
  };
  handleAddToFavorites = article_id => {
    this.props.addToFavorites(article_id);
  };
  render() {
    if (Object.keys(this.props.product).length == 0) {
      return (
        <Layout title={title} description={description}>
          <div className="product-wrapper">
            <section className="category-brands container">
              <BrandSlider />
            </section>
            <div className="content container">
              <aside className="sidebar-left">
                <AsideNav />
                <Filter />
              </aside>
              <main className="pdoduct-item">
                <p>Нам жаль, но такого продукта больше нет в наличии</p>
              </main>
            </div>
          </div>
        </Layout>
      );
    }
    const productKey = Object.keys(this.props.product)[0];
    const product = this.props.product[productKey];
    const {
      name,
      price,
      base_price,
      title,
      article,
      discount,
      article_info,
      category_id,
      link,
      description
    } = product;
    const { large } = product.photo;
    const { count } = this.props.reviews;
    const { descriptionOrReview } = this.state;
    return (
      <Layout title={title} description={description}>
        <div className="product-wrapper">
          <section className="category-brands container">
            <BrandSlider />
          </section>
          <div className="content container">
            <aside className="sidebar-left">
              <AsideNav />
            </aside>
            <main className="pdoduct-item">
              {this.getBreadcrumbs(category_id, link, name)}
              <div
                className="product"
                id="product"
                itemScope
                itemType="http://schema.org/Product"
              >
                <h1 className="product__title" itemProp="name">
                  {unescapeHtml(name)}
                </h1>
                <div className="product__rate">
                  <div className="star-ratings-css">
                    <div
                      className="star-ratings-css-top"
                      style={{
                        width: `${this.state.rating[productKey.substring(1)]}%`
                      }}
                    >
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <div className="star-ratings-css-bottom">
                      <span>☆</span>
                      <span>☆</span>
                      <span>☆</span>
                      <span>☆</span>
                      <span>☆</span>
                    </div>
                  </div>
                </div>
                <p className="product-stock">
                  {/*<!-- .out-of-stok for products out of stock-->*/}В наличии
                </p>
                <div className="product__img">
                  <img
                    itemProp="image"
                    src={`${prefixForSources}${large}`}
                    alt=""
                  />
                </div>
                <div className="product__code">Код: {article}</div>
                <meta itemProp="sku" content={article} />
                <div
                  className="product__price"
                  itemProp="offers"
                  itemScope
                  itemType="http://schema.org/Offer"
                >
                  <link
                    itemProp="url"
                    href={`https://everlast-original.com.ua${link}`}
                  />
                  <meta
                    itemProp="availability"
                    content="https://schema.org/InStock"
                  />
                  <meta itemProp="priceCurrency" content="UAH" />
                  {discount != 0 ? (
                    <span className="product__old-price">{`${base_price} грн`}</span>
                  ) : null}
                  <span itemProp="price">{price}</span>
                  <span> грн</span>
                </div>
                <div className="product-options">
                  {this.getProductOptions()}
                </div>
              </div>
            </main>
            <aside className="product-sidebar">
              <div className="tabs">
                <button
                  type="button"
                  className={
                    descriptionOrReview
                      ? "product-description active"
                      : "product-description"
                  }
                  onClick={this.handleDescriptionOrReview}
                >
                  ОПИСАНИЕ
                </button>
                <button
                  type="button"
                  className={
                    descriptionOrReview
                      ? "product-feedbacks"
                      : "product-feedbacks active"
                  }
                  onClick={this.handleDescriptionOrReview}
                >
                  ОТЗЫВЫ
                  <span className="product-feedbacks__count">{count}</span>
                </button>
              </div>
              <div className="tabs-content">
                {descriptionOrReview ? (
                  <div
                    itemProp="description"
                    className="tabs-content__item active"
                    dangerouslySetInnerHTML={{
                      __html: unescapeHtml(article_info)
                    }}
                  />
                ) : (
                  this.getReviews()
                )}
              </div>
            </aside>
          </div>
        </div>
        <Modal
          isOpen={this.state.reviewModal}
          style={customStyles}
          contentLabel="Оставить отзыв"
        >
          <div className="cart-main-close">
            <span className="close" onClick={this.closeModal} />
          </div>
          <AddReview
            closeModal={this.closeModal}
            productId={this.props.productId}
          />
        </Modal>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart,
    breadcrumbs: state.catalog.initialData.breadcrumbs,
    stores: state.filter.initialFilterData.stores
  };
};
export default connect(
  mapStateToProps,
  { setCart, addToCart, openCart, addToFavorites }
)(Product);
