import React from "react";
import InlineSVG from "svg-inline-react";
import { formBody, parseSearchResults } from "../../helpers/";
import { prefixForSources } from "../../constants";
import Router from "next/router";
import Link from "next/link";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", searchMatches: [], hover: false };
  }
  handleSearch = event => {
    const value = event.target.value;
    if (value.length < 3) {
      this.setState((prevState, props) => {
        return { value: value, searchMatches: [] };
      });
    } else {
      this.setState((prevState, props) => {
        return { ...prevState, value: value };
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    const searchString = this.state.value;
    if (searchString.length < 3) {
      return false;
    }
    if (prevState.value == this.state.value) return false;
    const params = {
      action: "getGoodsInSite",
      responce_type: "json",
      site: 1,
      string_search: `${searchString}`
    };
    fetch("https://everlast.scud.com.ua/api/", {
      method: "post",
      body: formBody(params),
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
            searchMatches: parseSearchResults(data.result.goods)
          };
        });
      });
  }
  handleSearchBtn = () => {
    const { value } = this.state;
    const href = {
      pathname: "/Catalog",
      query: { name: value }
    };
    const as = `/shop/?name=${value}`;
    Router.push(href, as, { shallow: true });
  };
  handleFocuse = param => {
    this.setState((prevState, props) => {
      return {
        ...prevState,
        hover: param
      };
    });
  };
  handleCloseDropdown = () => {
    setTimeout(() => {
      this.setState((prevState, props) => {
        return {
          ...prevState,
          hover: false
        };
      });
    }, 200);
  };
  render() {
    const { value } = this.state;
    return (
      <div className="search-form">
        <div className="search-input">
          <div className="search-input-icon">
            <InlineSVG
              src={`<svg id="Search" data-name="Search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 32"><defs><style>.cls-3,.cls-4{padding:1px;fill:none;stroke:#868586;stroke-miterlimit:10;}.cls-4{stroke-width:1.55px;}.cls-4{stroke-width:3.86px;}</style></defs><title>Поиск</title><path class="cls-4" d="M22.65,5.63a12.16,12.16,0,1,1-17-2.41A12.16,12.16,0,0,1,22.65,5.63Z"></path><path class="cls-4" d="M21.19,24.06l5.1,6.78"></path></svg>`}
            />
          </div>
          <input
            type="text"
            name="search"
            placeholder="поиск товаров (артикул или название)"
            value={this.state.value}
            onChange={this.handleSearch}
            onFocus={() => {
              this.handleFocuse(true);
            }}
            onBlur={this.handleCloseDropdown}
          />
          <div
            className={
              this.state.hover ? "search-dropdown" : "search-dropdown hide"
            }
          >
            <div className="search-dropdown-list">
              {this.state.searchMatches.map(item => {
                const { article, link_article, thumb, name } = item;
                return (
                  <div className="search-dropdown__item" key={article}>
                    <div className="search-dropdown-item__img">
                      <img src={`${prefixForSources}${thumb}`} alt="" />
                    </div>
                    <div className="search-dropdown-item__link">
                      <Link
                        href={{
                          pathname: `/Product`,
                          query: { id: link_article }
                        }}
                        as={`${link_article}`}
                      >
                        <a href={link_article}>{name}</a>
                      </Link>
                    </div>
                    <div className="search-dropdown-item__code">{article}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="search-button">
          <Link
            href={{ pathname: "/Catalog", query: { name: value } }}
            as={`/shop/?name=${value}`}
          >
            <button type="button" className="search__button">
              найти
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
