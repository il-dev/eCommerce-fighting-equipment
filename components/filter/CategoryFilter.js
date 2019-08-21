import React, { Component } from "react";
import InlineSVG from "svg-inline-react";
import Router from "next/router";
import { fetchFilters, addCategoryFilter } from "../../actions/filter";
import { connect } from "react-redux";
import { newRouteFromFilter, clearQueryData } from "../../helpers";
const setupCategorysCheckboxes = function(categorys, checkedCategory) {
  let result = {};

  Object.keys(categorys).forEach(key => {
    let categoryIsChecked = false;
    if (checkedCategory && checkedCategory[key]) {
      categoryIsChecked = true;
    }
    result[categorys[key].id] = { isChecked: categoryIsChecked };
  });
  return result;
};
const updateFilter = (filter, checkedFilter) => {
  let result = {};
  Object.keys(filter).forEach(key => {
    if (checkedFilter[key]) {
      result[key] = { isChecked: checkedFilter[key].isChecked };
    } else {
      result[key] = filter[key];
      result[key].isChecked = false;
    }
  });
  return result;
};
class CategoryFilter extends Component {
  constructor(props) {
    super(props);
    const categorys = props.siteCategory.parents;
    const checkedCategory = props.categoryFilter;
    this.state = {
      categoryFilter: setupCategorysCheckboxes(categorys, checkedCategory),
      checkedFilter: props.categoryFilter,
      query: props.query,
      count: props.initialFilterData.category_count,
      categoryFilterOpen: true
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log("nextProps", nextProps);
    // const {category_count} = nextProps.data.search;
    let update = {};
    if (
      nextProps.filterData &&
      nextProps.filterData.category_count &&
      prevState.count !== nextProps.filterData.category_count
    ) {
      update.count = nextProps.filterData.category_count;
    }
    if (prevState.checkedFilter !== nextProps.categoryFilter) {
      update.categoryFilter = updateFilter(
        prevState.categoryFilter,
        nextProps.categoryFilter
      );
      update.checkedFilter = nextProps.categoryFilter;
    }
    if (Object.keys(update).length > 0) return update;
    return null;
  }

  getCategoriesFilter() {
    const categorys = this.props.siteCategory.parents;
    const { count } = this.state;
    return Object.keys(categorys).map(key => {
      const { name, id } = categorys[key];
      const checked = this.state.categoryFilter[id].isChecked;
      return (
        <li key={id}>
          <label
            className={
              !count || !count[id] || count[id] == 0
                ? "control control--checkbox control-disabled"
                : "control control--checkbox"
            }
          >
            <input
              className="filter-list__input"
              type="checkbox"
              name={id}
              checked={checked}
              onChange={this.handleCategoriesInputChange}
              disabled={!count || !count[id] || count[id] == 0 ? true : false}
            />
            <span className="control__indicator" />
            <div
              className="filter-list-span"
              dangerouslySetInnerHTML={{ __html: name }}
            />
            <span className="filter__count">
              ({count && count[id] ? count[id] : 0})
            </span>
          </label>
        </li>
      );
    });
  }
  handleCategoriesInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const checkedFilter = {};
    checkedFilter["name"] = name;
    checkedFilter["value"] = value;
    this.props.addToFilter({ [name]: { isChecked: value } });
    const newRoute = newRouteFromFilter(
      "category",
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
    // console.log("this.state CATEGORY", this.state);
    // console.log("PROPS CATEGORY FILTER", this.props);
    const arrow = `<svg id="icon-down-arrow" viewBox="0 0 32 32" width="100%" height="100%"><title>down-arrow</title><path d="M30.090 8.583c-0.397-0.397-1.042-0.397-1.439 0l-12.651 12.676-12.676-12.676c-0.397-0.397-1.042-0.397-1.439 0s-0.397 1.042 0 1.439l13.371 13.371c0.198 0.198 0.447 0.298 0.719 0.298 0.248 0 0.521-0.099 0.719-0.298l13.371-13.371c0.422-0.397 0.422-1.042 0.025-1.439z"></path></svg>`;
    return (
      <div
        className={
          this.state.categoryFilterOpen ? "filter-list opened" : "filter-list"
        }
      >
        <div
          className="filter-list__title"
          onClick={() => {
            this.setState({
              categoryFilterOpen: !this.state.categoryFilterOpen
            });
          }}
        >
          Категория
          <span className="filter__arrow">
            <InlineSVG src={arrow} />
          </span>
        </div>
        <ul
          className={
            this.state.categoryFilterOpen ? "filter-ul" : "filter-ul hide"
          }
        >
          {this.getCategoriesFilter()}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ...state.filter,
    siteCategory: state.catalog.initialData.siteCategory
  };
};

export default connect(
  mapStateToProps,
  { addToFilter: addCategoryFilter, fetchFilters }
)(CategoryFilter);
