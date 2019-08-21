import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { buildQueryPaginate } from "../helpers/";

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    const { productsCoutn } = this.props;
    this.state = { productsCoutn: productsCoutn, currentPage: 1, limit: 12 };
  }
  static getDerivedStateFromProps(nextProps, state) {
    let update = {};
    if (nextProps.productsCoutn != state.productsCoutn) {
      update.productsCoutn = nextProps.productsCoutn;
    }
    if (
      nextProps.query &&
      nextProps.query.page &&
      nextProps.query.page != state.currentPage
    ) {
      update.currentPage = nextProps.query.page;
    }
    if (!nextProps.query || !nextProps.query.page) {
      update.currentPage = 1;
    }
    if (
      nextProps.query &&
      nextProps.query.limit &&
      nextProps.query.limit != state.limit
    ) {
      update.limit = nextProps.query.limit;
    } else if (nextProps.query && !nextProps.query.limit) {
      update.limit = 12;
    }
    if (Object.keys(update).length > 0) {
      return update;
    } else {
      return null;
    }
  }
  getMobilePaginate = () => {
    const { productsCoutn, currentPage, limit } = this.state;
    let pageUp;
    let pageDown;
    const totalPages = Math.ceil(productsCoutn / limit);
    if (totalPages == 1) return false;
    if (currentPage == 1) {
      pageUp = +currentPage + 1;
      pageDown = currentPage;
    } else if (currentPage == totalPages) {
      pageUp = currentPage;
      pageDown = currentPage - 1;
    } else {
      pageUp = +currentPage + 1;
      pageDown = currentPage - 1;
    }
    return (
      <ul className="paginate-list__mobile">
        <li
          className={
            pageDown == 0
              ? "disable-mobile-paginate paginate__link__mobile"
              : "paginate__link__mobile"
          }
        >
          <Link
            href={{
              pathname: "/Catalog",
              query: { ...this.props.query, page: pageDown }
            }}
            as={`?${buildQueryPaginate(this.props.query, pageDown)}`}
          >
            <a rel="prev">&lt;</a>
          </Link>
        </li>
        <li
          className={
            pageUp == totalPages
              ? "disable-mobile-paginate paginate__link__mobile"
              : "paginate__link__mobile"
          }
        >
          <Link
            href={{
              pathname: "/Catalog",
              query: { ...this.props.query, page: pageUp }
            }}
            as={`?${buildQueryPaginate(this.props.query, pageUp)}`}
          >
            <a rel="next">&gt;</a>
          </Link>
        </li>
      </ul>
    );
  };
  render() {
    const { productsCoutn, currentPage, limit } = this.state;
    if (productsCoutn / limit <= 1) return false;
    const pageCount = Math.ceil(+productsCoutn / +limit);

    let resultArray = [];
    for (let i = 1; i <= pageCount; i++) {
      if (pageCount <= 6) {
        if (i == currentPage) {
          resultArray.push({ page: i, active: true });
        } else {
          resultArray.push({ page: i, active: false });
        }
      } else {
        if (
          i == +currentPage + 1 ||
          i == +currentPage + 2 ||
          i == +currentPage - 1
        ) {
          resultArray.push({ page: i, active: false });
        } else if (currentPage == i) {
          resultArray.push({ page: i, active: true });
        } else if (i == currentPage + 3) {
          resultArray.push({ page: i, active: "spread" });
        } else if (i == pageCount - 2 || i == pageCount - 1) {
          resultArray.push({ page: i, active: false });
        }
      }
    }
    return (
      <div>
        {this.getMobilePaginate()}
        <ul className="paginate-list">
          <li className="paginate__link">
            <Link
              href={{
                pathname: "/Catalog",
                query: { ...this.props.query, page: 1 }
              }}
              as={`?${buildQueryPaginate(this.props.query, 1)}`}
            >
              <a rel="canonical">&lt;&lt;</a>
            </Link>
          </li>
          {currentPage != 1 && currentPage != 2 ? (
            <li
              className={
                currentPage == 1
                  ? "paginate__link paginate__link__disabled"
                  : "paginate__link"
              }
            >
              <Link
                href={{
                  pathname: "/Catalog",
                  query: { ...this.props.query, page: currentPage - 1 }
                }}
                as={`?${buildQueryPaginate(this.props.query, currentPage - 1)}`}
              >
                <a rel="prev">&lt;</a>
              </Link>
            </li>
          ) : null}

          {resultArray.map(item => {
            if (item.active == true) {
              return (
                <li key={item.page} className="paginate__link active">
                  <span>{item.page}</span>
                </li>
              );
            } else if (item.active == "spread") {
              return (
                <li key={item.page} className="paginate__link spread">
                  <span>...</span>
                </li>
              );
            } else {
              return (
                <li key={item.page} className="paginate__link">
                  <Link
                    href={{
                      pathname: "/Catalog",
                      query: { ...this.props.query, page: item.page }
                    }}
                    as={`?${buildQueryPaginate(this.props.query, item.page)}`}
                  >
                    <a rel="canonical">{item.page}</a>
                  </Link>
                </li>
              );
            }
          })}
          {+currentPage + 1 != pageCount ? (
            <li
              className={
                currentPage == pageCount
                  ? "paginate__link paginate__link__disabled"
                  : "paginate__link"
              }
            >
              <Link
                href={{
                  pathname: "/Catalog",
                  query: { ...this.props.query, page: +currentPage + 1 }
                }}
                as={`?${buildQueryPaginate(
                  this.props.query,
                  +currentPage + 1
                )}`}
              >
                <a rel="next">&gt;</a>
              </Link>
            </li>
          ) : null}
          <li className="paginate__link">
            <Link
              href={{
                pathname: "/Catalog",
                query: { ...this.props.query, page: pageCount }
              }}
              as={`?${buildQueryPaginate(this.props.query, pageCount)}`}
            >
              <a rel="canonical">&gt;&gt;</a>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.catalog;
};
export default connect(mapStateToProps)(Pagination);
