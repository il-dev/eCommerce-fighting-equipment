import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { parseQuery } from "../../helpers/";

class AsideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openedIds: {} };
  }
  getMenu = () => {
    const { parents, childs } = this.props.siteCategory;
    return (
      <ul className="aside__nav">
        {Object.keys(parents).map(parentId => {
          const query = parseQuery(parents[parentId].link);
          const id = parents[parentId].link;
          return (
            <li key={parentId}>
              <Link
                href={{
                  pathname: "/Catalog",
                  query: { category: query, id: id }
                }}
                as={parents[parentId].link}
              >
                <a href={parents[parentId].link} title={parents[parentId].name}>
                  {parents[parentId].name}
                </a>
              </Link>
              {!childs[parentId] ? null : this.getSubmenu(parentId)}
            </li>
          );
        })}
      </ul>
    );
  };
  getSubmenu = parentId => {
    const { parents, childs } = this.props.siteCategory;
    return (
      <ul className="aside__nav-inner">
        {Object.keys(childs[parentId]).map(childId => {
          const query = parseQuery(childs[parentId][childId].link);
          const id = childs[parentId][childId].link;
          return (
            <li key={childId}>
              <Link
                href={{
                  pathname: "/Catalog",
                  query: { category: query, id: id }
                }}
                as={childs[parentId][childId].link}
              >
                <a
                  href={childs[parentId][childId].link}
                  title={childs[parentId][childId].name}
                >
                  {childs[parentId][childId].name}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };
  getMobileCategory = () => {
    const { parents, childs } = this.props.siteCategory;
    const { openedIds } = this.state;
    return (
      <div className="mobile-category-items">
        {Object.keys(parents).map(parentId => {
          const query = parseQuery(parents[parentId].link);
          const id = parents[parentId].link;
          return (
            <div
              key={parentId}
              className={
                openedIds[parentId]
                  ? "mobile-category-item active"
                  : "mobile-category-item"
              }
            >
              <div className="mobile-category-item_link">
                <Link
                  href={{
                    pathname: "/Catalog",
                    query: { category: query, id: id }
                  }}
                  as={parents[parentId].link}
                >
                  <a
                    onClick={this.hundleClickAndCloseDrawer}
                    href={parents[parentId].link}
                    title={parents[parentId].name}
                  >
                    {parents[parentId].name}
                  </a>
                </Link>
                {!childs[parentId] ? null : (
                  <div
                    className="mobile-category-open-button"
                    onClick={() => {
                      this.hundleOpenAccordion(parentId);
                    }}
                  />
                )}
              </div>
              {!childs[parentId]
                ? null
                : this.getMobileCategorySubmenu(parentId)}
            </div>
          );
        })}
      </div>
    );
  };
  hundleOpenAccordion = parentId => {
    this.setState({
      ...this.state,
      openedIds: {
        ...this.state.openedIds,
        [parentId]: this.state.openedIds[parentId]
          ? !this.state.openedIds[parentId]
          : true
      }
    });
  };
  hundleClickAndCloseDrawer = () => {
    setTimeout(() => {
      this.props.closeDrawer();
    }, 500);
  };
  getMobileCategorySubmenu = parentId => {
    const { parents, childs } = this.props.siteCategory;
    return (
      <ul className="mobile-category-inner">
        {Object.keys(childs[parentId]).map(childId => {
          const query = parseQuery(childs[parentId][childId].link);
          const id = childs[parentId][childId].link;
          return (
            <li key={childId}>
              <Link
                href={{
                  pathname: "/Catalog",
                  query: { category: query, id: id }
                }}
                as={childs[parentId][childId].link}
              >
                <a
                  onClick={this.hundleClickAndCloseDrawer}
                  className="mobile-category-inner_link"
                  href={childs[parentId][childId].link}
                  title={childs[parentId][childId].name}
                >
                  {childs[parentId][childId].name}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };
  render() {
    const { parents, childs } = this.props.siteCategory;
    return (
      <div className="aside__block">
        <div className="desktop-category-wrapper">
          <h3 className="aside__title">Каталог</h3>
          <nav className="aside-nav">{this.getMenu()}</nav>
        </div>
        <div className="mobile-category-wrapper">
          <Link
            href={{
              pathname: "/Catalog"
            }}
            as="/shop/"
          >
            <h3
              onClick={this.hundleClickAndCloseDrawer}
              className="aside__title"
            >
              Каталог
            </h3>
          </Link>
          {this.getMobileCategory()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { siteCategory: state.catalog.initialData.siteCategory };
};
export default connect(mapStateToProps)(AsideNav);
