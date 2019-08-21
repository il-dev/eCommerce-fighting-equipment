import React from "react";
import RangeFilter from "./RangeFilter";
import BrandFilter from "./BrandFilter";
import CategoryFilter from "./CategoryFilter";
import SizeFilter from "./SizeFilter";
import ColorFilter from "./ColorFilter";
import { connect } from "react-redux";
import { addInitialFilter } from "../../actions/filter";
import { returnInitialFilterData } from "../../actions/filter";
import Link from "next/link";
import Router from "next/router";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    Router.events.on("routeChangeComplete", url => {
      props.returnInitialFilterData(url);
    });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loading != prevState.loading)
      return { loading: nextProps.loading };
    return null;
  }

  render() {
    const arrow = `<svg id="icon-down-arrow" viewBox="0 0 32 32" width="100%" height="100%"><title>down-arrow</title><path d="M30.090 8.583c-0.397-0.397-1.042-0.397-1.439 0l-12.651 12.676-12.676-12.676c-0.397-0.397-1.042-0.397-1.439 0s-0.397 1.042 0 1.439l13.371 13.371c0.198 0.198 0.447 0.298 0.719 0.298 0.248 0 0.521-0.099 0.719-0.298l13.371-13.371c0.422-0.397 0.422-1.042 0.025-1.439z"></path></svg>`;
    const { loading } = this.state;
    return (
      <div className={loading ? "filter loading" : "filter"}>
        <div className={loading ? "spinner" : "hide-spinner"}>
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
        <RangeFilter />
        <BrandFilter />
        <CategoryFilter />
        <SizeFilter />
        <ColorFilter />
        <div className="filter-buttons">
          <Link href={{ pathname: "/Catalog" }} as={`/shop/`}>
            <button type="button" className="filter-clear__button">
              СБРОСИТЬ ФИЛЬТР
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.filter;
};

export default connect(
  mapStateToProps,
  { addInitialFilter, returnInitialFilterData }
)(Filter);
