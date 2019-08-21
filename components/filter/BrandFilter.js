import React, { Component } from "react";
import InlineSVG from "svg-inline-react";
import { connect } from "react-redux";
import { fetchFilters, addBrandFilter } from "../../actions/filter";
import { clearQueryData, newRouteFromFilter } from "../../helpers/";
import Router from "next/router";

const setupTopBrandsCheckboxes = function(topBrands, checkedFilters) {
  let result = {};
  let brandIsChecked = false;
  Object.keys(topBrands).forEach(key => {
    const checkedArray = Object.keys(checkedFilters);
    for (let checkedKey of checkedArray) {
      if (
        topBrands[key].id == checkedKey &&
        checkedFilters[checkedKey].isChecked == true
      ) {
        brandIsChecked = true;
        break;
      } else {
        brandIsChecked = false;
      }
    }

    result[topBrands[key].id] = { isChecked: brandIsChecked };
  });
  return result;
};
const setupRestBrandsCheckboxes = function(restBrands, checkedFilters) {
  let result = {};
  let brandIsChecked = false;
  restBrands.forEach(item => {
    const checkedArray = Object.keys(checkedFilters);
    for (let checkedKey of checkedArray) {
      if (
        item.id == checkedKey &&
        checkedFilters[checkedKey].isChecked == true
      ) {
        brandIsChecked = true;
        break;
      } else {
        brandIsChecked = false;
      }
    }
    result[item.id] = { isChecked: brandIsChecked };
  });
  return result;
};
const updateFilter = (filter, checkedFilter) => {
  let result = {};
  Object.keys(filter).map(key => {
    if (checkedFilter[key]) {
      result[key] = { isChecked: checkedFilter[key].isChecked };
    } else {
      result[key] = filter[key];
      result[key].isChecked = false;
    }
  });
  return result;
};
class BrandFilter extends Component {
  constructor(props) {
    super(props);
    // const countCache = props.filterData.brand_count;
    const { topBrands, restBrands } = props.initialFilterData.brands;
    this.state = {
      brandFilter: Object.assign(
        {},
        setupTopBrandsCheckboxes(topBrands, props.brandFilter),
        setupRestBrandsCheckboxes(restBrands, props.brandFilter)
      ),
      brandFilterCache: props.brandFilter, // check, maybe dont need
      countCache: props.initialFilterData.brand_count,
      brandFilterShowMore: false,
      brandFilterOpen: true,
      query: props.query
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.query &&
      nextProps.query != prevState.query &&
      !nextProps.query.brand
    ) {
      const newClearState = {};
      Object.keys(prevState.brandFilter).map(key => {
        newClearState[key] = { isChecked: false };
      });
      return { brandFilter: newClearState };
    }
    if (prevState.brandFilterCache !== nextProps.brandFilter) {
      return {
        brandFilter: updateFilter(prevState.brandFilter, nextProps.brandFilter)
      };
    }
    return null;
  }

  getTopBrandFilters() {
    const { topBrands } = this.props.initialFilterData.brands;
    let count;
    if (this.props.returnToInitialState) {
      count = this.props.initialFilterData.brand_count;
    } else {
      count = this.props.filterData.brand_count;
    }

    return Object.keys(topBrands).map(key => {
      const { brand, id } = topBrands[key];
      const checked = this.state.brandFilter[id].isChecked;
      return (
        <li key={id}>
          <label className="control control--checkbox">
            <input
              className="filter-list__input"
              type="checkbox"
              name={id}
              checked={checked}
              onChange={this.handleBrandInputChange}
              disabled={!count[id] ? true : false}
            />
            <span className="control__indicator" />
            {brand} <span className="filter__count">({count[id] || 0})</span>
          </label>
        </li>
      );
    });
  }
  getRestBrandFilters() {
    const { restBrands } = this.props.initialFilterData.brands;
    const count = this.props.initialFilterData.brand_count;
    return restBrands.map(item => {
      const { brand, id } = item;
      const checked = this.state.brandFilter[id].isChecked;
      return (
        <li
          key={id}
          className={!this.state.brandFilterShowMore ? "hide-filter" : null}
        >
          <label className="control control--checkbox">
            <input
              className="filter-list__input"
              type="checkbox"
              name={id}
              checked={checked}
              onChange={this.handleBrandInputChange}
              disabled={count[id] == 0 ? true : false}
            />
            <span className="control__indicator" />
            <div
              className="filter-list-span"
              dangerouslySetInnerHTML={{ __html: brand }}
            />
            <span className="filter__count">({count[id] || 0})</span>
          </label>
        </li>
      );
    });
  }

  handleBrandInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const checkedFilter = {};
    checkedFilter["name"] = name;
    checkedFilter["value"] = value;
    this.props.addToFilter({ [name]: { isChecked: value } });

    const newRoute = newRouteFromFilter(
      "brand",
      checkedFilter,
      clearQueryData(Router.query)
    );
    const href = {
      pathname: "/Catalog",
      query: newRoute.query
    };
    const as = newRoute.as;
    Router.push(href, as, { shallow: true });
    this.props.fetchFilters(newRoute.query);
  };
  handleShowMore = event => {
    const target = event.target;
    const name = target.name;
    this.setState({ [name]: !this.state[name] });
  };

  render() {
    const arrow = `<svg id="icon-down-arrow" viewBox="0 0 32 32" width="100%" height="100%"><title>down-arrow</title><path d="M30.090 8.583c-0.397-0.397-1.042-0.397-1.439 0l-12.651 12.676-12.676-12.676c-0.397-0.397-1.042-0.397-1.439 0s-0.397 1.042 0 1.439l13.371 13.371c0.198 0.198 0.447 0.298 0.719 0.298 0.248 0 0.521-0.099 0.719-0.298l13.371-13.371c0.422-0.397 0.422-1.042 0.025-1.439z"></path></svg>`;
    return (
      <div
        className={
          this.state.brandFilterOpen ? "filter-list opened" : "filter-list"
        }
      >
        <div
          className="filter-list__title"
          onClick={() => {
            this.setState({ brandFilterOpen: !this.state.brandFilterOpen });
          }}
        >
          БРЕНД
          <span className="filter__arrow">
            <InlineSVG src={arrow} />
          </span>
        </div>
        <ul
          className={
            this.state.brandFilterOpen ? "filter-ul" : "filter-ul hide"
          }
        >
          {this.getTopBrandFilters()}
          {this.getRestBrandFilters()}
        </ul>

        {this.state.brandFilterOpen ? (
          <button
            type="button"
            className="filter-show-more show"
            name="brandFilterShowMore"
            onClick={this.handleShowMore}
          >
            {!this.state.brandFilterShowMore
              ? "Показать все"
              : "Показать основные"}
          </button>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state.filter;
};

export default connect(
  mapStateToProps,
  { addToFilter: addBrandFilter, fetchFilters }
)(BrandFilter);
