import React from "react";
import InputRange from "react-input-range";
import { connect } from "react-redux";
import Router from "next/router";
import { fetchFilters, addRangeFilter } from "../../actions/filter";
import { newRouteFromFilter, clearQueryData } from "../../helpers";
class RangeFilter extends React.Component {
  constructor(props) {
    super(props);
    const { min = 0, max = 9999999 } = props.initialFilterData.price;
    const { min: minValue = min, max: maxValue = max } = props.rangeFilterValue;
    this.state = {
      initialFilterValue: {
        min: Math.round(min),
        max: Math.round(max)
      },
      rangeFilterValue: {
        min: Math.round(minValue),
        max: Math.round(maxValue)
      },
      minMaxCache: { min, max },
      valueCache: props.rangeFilterValue
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.rangeFilterValue != prevState.valueCache) {
      if (Object.keys(nextProps.rangeFilterValue).length == 0) {
        const { min, max } = prevState.initialFilterValue;
        return {
          rangeFilterValue: { min: Math.round(min), max: Math.round(max) }
        };
      } else {
        const { min, max } = prevState.rangeFilterValue;
        return {
          rangeFilterValue: { min: Math.round(min), max: Math.round(max) }
        };
      }
    }
    return null;
  }
  handleInputComplate = value => {
    const { min: initialMin, max: initialMax } = this.state.initialFilterValue;
    const { min, max } = value;
    if (min < initialMin) return false;
    if (max > initialMax) return false;
    const checkedFilter = {};
    checkedFilter["name"] = "price";
    checkedFilter["value"] = `${value.min}-${value.max}`;
    this.props.addRangeFilter(value);
    const newRoute = newRouteFromFilter(
      "price",
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
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState(
      {
        rangeFilterValue: {
          ...this.state.rangeFilterValue,
          [name]: +value
        }
      },
      () => {
        this.handleInputComplate(this.state.rangeFilterValue);
      }
    );
  };
  mainInputChange = value => {
    const { min: initialMin, max: initialMax } = this.state.initialFilterValue;
    const { min, max } = value;
    if (min < initialMin) return false;
    if (max > initialMax) return false;
    this.setState({ rangeFilterValue: value });
  };
  render() {
    const { min, max } = this.state.initialFilterValue;
    const { min: minValueRaw, max: maxValueRaw } = this.state.rangeFilterValue;
    const minValue = Math.round(minValueRaw);
    const maxValue = Math.round(maxValueRaw);
    return (
      <div className="range-filter">
        <div className="range-filter__title">ЦЕНА</div>
        <div className="filter-price-inputs">
          <div className="filter-price__input filter-price__min">
            <label htmlFor="input-number-min">
              <input
                type="number"
                step="1"
                min={min}
                max={max}
                name="min"
                value={minValue}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="filter-price__input filter-price__max">
            <label htmlFor="input-number-max">
              <input
                type="number"
                step="1"
                min={min}
                max={max}
                name="max"
                value={maxValue}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
        </div>
        <div className="filter-price__input-range">
          <InputRange
            minValue={min}
            maxValue={max}
            onChangeComplete={this.handleInputComplate}
            value={this.state.rangeFilterValue}
            allowSameValues={true}
            onChange={value => {
              this.mainInputChange(value);
            }}
          />
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
  { addRangeFilter, fetchFilters }
)(RangeFilter);
