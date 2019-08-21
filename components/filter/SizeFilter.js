import React, { Component } from "react";
import InlineSVG from "svg-inline-react";
import { connect } from "react-redux";
import Router from "next/router";
import { fetchFilters, addSizeFilter } from "../../actions/filter";
import { newRouteFromFilter, clearQueryData } from "../../helpers";

const setupColorsCheckboxes = function(colors, checkedSize, filterCount) {
  let result = {};
  Object.keys(colors).forEach(key => {
    let sizeIsChecked = false;
    if (!filterCount[key] || filterCount[key] == 0) return false;
    if (checkedSize[key] && checkedSize[key].isChecked == true) {
      sizeIsChecked = true;
    }
    result[key] = { isChecked: sizeIsChecked };
    result[key].name = colors[key];
  });
  return result;
};

class SizeFilter extends Component {
  constructor(props) {
    super(props);
    const checkedSize = props.sizeFilter;
    const filterCount = props.initialFilterData.size_count;
    this.state = {
      sizeFilter: setupColorsCheckboxes(
        props.initialFilterData.sizes,
        checkedSize,
        filterCount
      ),
      filterCountCache: filterCount,
      colorsFilterShowMore: false,
      colorFilterOpen: false
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.filterData &&
      prevState.filterCountCache != nextProps.filterData.size_count
    ) {
      return {
        sizeFilter: setupColorsCheckboxes(
          nextProps.filterData.size,
          nextProps.sizeFilter,
          nextProps.filterData.size_count
        )
      };
    }
    return null;
  }
  getColorsFilter() {
    const { sizeFilter } = this.state;
    let size_count;
    if (this.props.returnToInitialState) {
      size_count = this.props.initialFilterData.size_count;
    } else {
      size_count = this.props.filterData.size_count;
    }

    return Object.keys(sizeFilter).map(key => {
      const checked = sizeFilter[key].isChecked;
      return (
        <li key={key}>
          <label className="control control--checkbox">
            <input
              className="filter-list__input"
              type="checkbox"
              name={key}
              checked={checked}
              onChange={this.handleColorInputChange}
            />
            <span className="control__indicator" />
            <div dangerouslySetInnerHTML={{ __html: sizeFilter[key].name }} />
            <span className="filter__count">({size_count[key]})</span>
          </label>
        </li>
      );
    });
  }
  handleColorInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.props.addToFilter({ [name]: { isChecked: value } });
    const checkedFilter = {};
    checkedFilter["name"] = name;
    checkedFilter["value"] = value;
    const newRoute = newRouteFromFilter(
      "size",
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
  render() {
    const arrow = `<svg id="icon-down-arrow" viewBox="0 0 32 32" width="100%" height="100%"><title>down-arrow</title><path d="M30.090 8.583c-0.397-0.397-1.042-0.397-1.439 0l-12.651 12.676-12.676-12.676c-0.397-0.397-1.042-0.397-1.439 0s-0.397 1.042 0 1.439l13.371 13.371c0.198 0.198 0.447 0.298 0.719 0.298 0.248 0 0.521-0.099 0.719-0.298l13.371-13.371c0.422-0.397 0.422-1.042 0.025-1.439z"></path></svg>`;
    return (
      <div
        className={
          this.state.colorFilterOpen ? "filter-list opened" : "filter-list"
        }
      >
        <div
          className="filter-list__title"
          onClick={() => {
            this.setState({ colorFilterOpen: !this.state.colorFilterOpen });
          }}
        >
          Размер
          <span className="filter__arrow">
            <InlineSVG src={arrow} />
          </span>
        </div>
        <ul
          className={
            this.state.colorFilterOpen ? "filter-ul" : "filter-ul hide"
          }
        >
          {this.getColorsFilter()}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state.filter;
};

export default connect(
  mapStateToProps,
  { addToFilter: addSizeFilter, fetchFilters }
)(SizeFilter);
