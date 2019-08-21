import React from "react";
import Link from "next/link";
import "isomorphic-unfetch";
import ReactSVG from "react-svg";
import Layout from "../components/layout/Layout";
import AsideNav from "../components/layout/AsideNav";
import Filter from "../components/filter/Filter";
import InlineSVG from "svg-inline-react";
import { parseQuery, buildQueryCatalog } from "../helpers/";
import BrandSlider from "../components/BrandSlider";
import Router from "next/router";
import Pagination from "../components/Pagination";
import { connect } from "react-redux";
import { fetchData, initailDataFetch } from "../actions/";
import { addToFavorites } from "../actions/favorite";
import { openMobileFilter } from "../actions/mobile";
import StandartView from "../components/view/StandartView";
import CustomView from "../components/view/CustomView";

class Catalog extends React.Component {
  static async getInitialProps({ query, reduxStore, req }) {
    // eslint-disable-next-line no-undef
    await reduxStore.dispatch(initailDataFetch(query));
  }
  constructor(props) {
    super(props);

    this.state = {
      limit: 12,
      order: false,
      standartView: true,
      productsCoutn: 0,
      currentPage: 1,
      rating: {},
      loading: false
    };
  }
  static getDerivedStateFromProps(nextProps, state) {
    let update = {};
    if (nextProps.filteredProducts != state.products) {
      update.products = nextProps.filteredProducts;
    }
    if (nextProps.query && nextProps.query.page != state.currentPage) {
      update.currentPage = nextProps.query.page;
    }
    if (nextProps.rating != state.rating) {
      update.rating = nextProps.rating;
    }
    if (
      nextProps.query &&
      nextProps.query.limit &&
      nextProps.query.limit !== state.limit
    ) {
      update.limit = nextProps.query.limit;
    } else if (nextProps.query && !nextProps.query.limit) {
      update.limit = 12;
    }
    if (
      nextProps.query &&
      nextProps.query.order &&
      nextProps.query.order !== state.order
    ) {
      update.order = nextProps.query.order;
    } else if (nextProps.query && !nextProps.query.order) {
      update.order = false;
    }
    if (nextProps.loading != state.loading) {
      update.loading = nextProps.loading;
    }
    if (Object.keys(update).length > 0) {
      return update;
    } else {
      return null;
    }
  }

  getBreadcrumbs = () => {
    const { query } = this.props;
    if (!query || query.id == "/shop/") {
      return (
        <ul className="breadcrumbs">
          <li>
            <Link href={{ pathname: "/" }} as={`/`}>
              <a href="/">Главная</a>
            </Link>
          </li>
          <li>
            <Link href={{ pathname: "/Catalog" }} as={`/shop/`}>
              <a href="/shop/">Каталог</a>
            </Link>
          </li>
        </ul>
      );
    }
    if (!query.id) {
      return (
        <ul className="breadcrumbs">
          <li>
            <Link href={{ pathname: "/" }} as={`/`}>
              <a href="/">Главная</a>
            </Link>
          </li>
          <li>
            <Link href={{ pathname: "/Catalog" }} as={`/shop/`}>
              <a href="/shop/">Каталог</a>
            </Link>
          </li>
        </ul>
      );
    } else {
      const categpryId = parseQuery(query.id);
      if (!this.props.initialData.breadcrumbs[categpryId]) return false;
      const breadcrumbs = this.props.initialData.breadcrumbs[categpryId];
      return (
        <ul className="breadcrumbs">
          {Object.keys(breadcrumbs).map(key => {
            return (
              <li key={key}>
                <Link
                  href={{
                    pathname: "/Catalog"
                  }}
                  as={`${breadcrumbs[key].link}`}
                >
                  <a href={breadcrumbs[key].link}>{breadcrumbs[key].name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      );
    }
  };
  addToFavorites = article_id => {
    this.props.addToFavorites(article_id);
  };
  getProducts() {
    const { products, sizes } = this.props;
    const { loading, rating, standartView } = this.state;
    if (standartView) {
      return (
        <StandartView
          products={products}
          sizes={sizes}
          loading={loading}
          rating={rating}
          addToFavorites={this.addToFavorites}
        />
      );
    } else {
      return (
        <CustomView
          products={products}
          sizes={sizes}
          loading={loading}
          rating={rating}
          addToFavorites={this.addToFavorites}
        />
      );
    }
  }
  handleLimitChange = event => {
    const { name, value } = event.target;
    const { category } = this.props.query;
    const { limit, order } = this.state;
    let routeNew = {};
    if (name == "limit") {
      routeNew = this.newRoute(value, order);
    } else {
      routeNew = this.newRoute(limit, value);
    }

    const href = {
      pathname: "/Catalog",
      query: routeNew.query
    };
    const as = routeNew.as;
    Router.push(href, as, { shallow: true });
    this.props.initailDataFetch(Router.query);
  };
  newRoute = (limit, order) => {
    const query = Router.query;
    let newQuery = Router.query;

    if (limit) {
      newQuery.limit = limit;
    }
    if (order) {
      newQuery.order = order;
    }

    const str = buildQueryCatalog(newQuery);
    return { as: str, query: newQuery };
  };
  handleViewChange = name => {
    let view;
    if (name == "standart") view = true;
    if (name == "custom") view = false;
    this.setState((state, props) => {
      return { ...state, standartView: view };
    });
    localStorage.setItem("view", name);
  };

  render() {
    const { products } = this.props;
    let meta_title;
    let meta_description;
    let name;
    if (
      this.props.metaDataOfCatalog &&
      this.props.metaDataOfCatalog.meta_title &&
      this.props.metaDataOfCatalog.meta_description
    ) {
      meta_title = this.props.metaDataOfCatalog.meta_title;
      meta_description = this.props.metaDataOfCatalog.meta_description;
    } else {
      meta_title =
        "Каталог товаров для бокса и единоборств в Украине! Купите одежду, экипировку, инвентарь в магазине «Everlast original».";
      meta_description =
        "Продажа одежды, экипировки, инвентаря и аксессуаров для единоборств от прямого поставщика по лучшей цене! Товары для бокса, MMA, единоборств в интернет-магазине «Everlast original» с доставкой по всей Украине!";
    }
    if (this.props.metaDataOfCatalog && this.props.metaDataOfCatalog.name) {
      name = this.props.metaDataOfCatalog.name;
    } else {
      name = "Каталог товаров";
    }
    return (
      <Layout title={meta_title} description={meta_description}>
        <section className="category-brands container">
          <BrandSlider />
        </section>
        <div className="content container category-page">
          <aside className="sidebar-left">
            <AsideNav />
            {this.props.query && this.props.query.promos ? null : (
              <Filter query={this.props.query} />
            )}
          </aside>
          <main className="category">
            <h1 className="category-title">{name}</h1>
            {this.getBreadcrumbs()}
            <div className="products-sort">
              <div className="products-sort__item mobile-filter">
                <button
                  className="mobile-filter__button"
                  type="button"
                  onClick={this.props.openMobileFilter}
                >
                  ФИЛЬТР
                  <ReactSVG
                    src="/static/img/icons/funnel.svg"
                    className="icon icon-funnel"
                  />
                </button>
              </div>
              <div className="products-sort__item mobile-sort">
                <span className="products-sort__title">Сортировать по</span>
                <select
                  onChange={this.handleLimitChange}
                  name="order"
                  value={this.state.order}
                >
                  <option value="default" disabled>
                    Выбирете из списка
                  </option>
                  <option value="brand-asc">Наименованию (А-Я)</option>
                  <option value="brand-desc">Наименованию (Я-А)</option>
                  <option value="code-asc">Коду (А-Я)</option>
                  <option value="code-desc">Коду (Я-А)</option>
                  <option value="price-asc">По возрастанию цены</option>
                  <option value="price-desc">По убыванию цены</option>
                </select>
              </div>
              <div className="products-sort__item">
                <span className="products-sort__title">
                  Товаров на странице
                </span>
                <select
                  className="products-sort__on-page"
                  onChange={this.handleLimitChange}
                  name="limit"
                  value={this.state.limit}
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="36">36</option>
                </select>
              </div>
              <div className="products-sort__item">
                <span className="products-sort__title">Вид</span>
                <button
                  type="button"
                  className="product-view__tile"
                  name="standart"
                  onClick={() => {
                    this.handleViewChange("standart");
                  }}
                >
                  <InlineSVG
                    src={`<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 290 290"><defs><style>.cls-1{fill:#b89d65;}</style></defs><title>Стандартный вид</title><rect class="cls-1" y="220" width="70" height="70"/><rect class="cls-1" y="110" width="70" height="70"/><rect class="cls-1" width="70" height="70"/><rect class="cls-1" x="110" y="220" width="70" height="70"/><rect class="cls-1" x="110" y="110" width="70" height="70"/><rect class="cls-1" x="110" width="70" height="70"/><rect class="cls-1" x="220" y="220" width="70" height="70"/><rect class="cls-1" x="220" y="110" width="70" height="70"/><rect class="cls-1" x="220" width="70" height="70"/></svg>`}
                  />
                </button>
                <button
                  type="button"
                  className="product-view__list"
                  name="custom"
                  onClick={() => {
                    this.handleViewChange("custom");
                  }}
                >
                  <InlineSVG
                    src={`<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.83 92.83"><defs><style>.cls-1{fill:#b89d65;}</style></defs><title>В строку</title><path class="cls-1" d="M89.83,1.75H3a3,3,0,0,0-3,3V18.08a3,3,0,0,0,3,3H89.83a3,3,0,0,0,3-3V4.75A3,3,0,0,0,89.83,1.75Z"/><path class="cls-1" d="M89.83,36.75H3a3,3,0,0,0-3,3V53.08a3,3,0,0,0,3,3H89.83a3,3,0,0,0,3-3V39.75A3,3,0,0,0,89.83,36.75Z"/><path class="cls-1" d="M89.83,71.75H3a3,3,0,0,0-3,3V88.08a3,3,0,0,0,3,3H89.83a3,3,0,0,0,3-3V74.75A3,3,0,0,0,89.83,71.75Z"/></svg>`}
                  />
                </button>
              </div>
            </div>
            <div className="products-container">
              <div className={this.state.loading ? "spinner" : "hide-spinner"}>
                <div className="lds-spinner">
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>
              {!products || Object.keys(products).length == 0 ? (
                <p>Очень жаль, но нет продукции с такими параметрами</p>
              ) : (
                this.getProducts()
              )}
            </div>
            <div className="paginate">
              <Pagination />
            </div>
          </main>
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return { ...state.catalog, sizes: state.filter.initialFilterData.sizes };
};
export default connect(
  mapStateToProps,
  { fetchData, addToFavorites, initailDataFetch, openMobileFilter }
)(Catalog);
