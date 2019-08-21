import React, { Component } from "react";
import MobileMenu from "./MobileMenu";
import Filter from "../../components/filter/Filter";
import AsideNav from "./AsideNav";
import { connect } from "react-redux";
import { closeDrawer, openMobilCategory } from "../../actions/mobile";

class MobileDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerIsOpen: false,
      filterIsOpen: false,
      sortIsOpen: false,
      menuIsOpen: false,
      categoryIsOpen: false
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      return { ...nextProps };
    }
    return null;
  }
  closeDrawer = () => {
    this.props.closeDrawer();
  };
  render() {
    const {
      drawerIsOpen,
      filterIsOpen,
      categoryIsOpen,
      menuIsOpen
    } = this.state;
    return (
      <div
        className={
          drawerIsOpen ? "side-drawer side-drawer__show" : "side-drawer"
        }
      >
        <button onClick={this.closeDrawer} className="closebtn">
          &times;
        </button>
        {filterIsOpen ? <Filter /> : null}
        {menuIsOpen ? (
          <MobileMenu
            closeDrawer={this.closeDrawer}
            openMobilCategory={this.props.openMobilCategory}
          />
        ) : null}
        {categoryIsOpen ? <AsideNav closeDrawer={this.closeDrawer} /> : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state.mobileDrawer;
};
export default connect(
  mapStateToProps,
  { closeDrawer, openMobilCategory }
)(MobileDrawer);
