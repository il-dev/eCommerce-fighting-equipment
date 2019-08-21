import React, { Component } from "react";
import InlineSVG from "svg-inline-react";
import { connect } from "react-redux";
import { prefixForSources } from "../constants";
import Link from "next/link";
import { getFavorites, delFavorites } from "../actions/favorite";
import { getItemFromStorage } from "../actions/storage";
class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: props.auth.auth,
      favorites: props.items
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.auth !== nextProps.auth.auth) {
      return { auth: nextProps.auth.auth, uuid: nextProps.auth.uuid };
    }
    if (prevState.favorites !== nextProps.favorites.items) {
      return { favorites: nextProps.favorites.items };
    }
    return null;
  }
  componentDidMount = () => {
    const uuid = this.props.getItemFromStorage("uuid");
    if (!uuid) return false;
    this.props.getFavorites();
  };
  handleDeleteItem = id => {
    const uuid = this.props.getItemFromStorage("uuid");
    if (!uuid) return false;
    this.props.delFavorites(id);
  };
  getFavorites = () => {
    const { favorites } = this.state;
    if (!favorites || favorites.length == 0) return <p>Список желаний пуст</p>;
    return favorites.map(item => {
      const { id, link_article, price, thumb, name } = item;
      return (
        <div className="favorites-wrapper" key={id}>
          <div className="favorite__img">
            <Link
              href={{ pathname: "/Product", query: { id: link_article } }}
              as={link_article}
            >
              <a href={link_article}>
                <img src={`${prefixForSources}${thumb}`} alt="" />
              </a>
            </Link>
          </div>
          <div className="favorite_link">
            <Link
              href={{ pathname: "/Product", query: { id: link_article } }}
              as={link_article}
            >
              <a
                className="favorite_name"
                href={link_article}
                dangerouslySetInnerHTML={{ __html: name }}
              />
            </Link>
            <div className="favorite-info">
              <div className="favorite_price">{`Цена: ${price} грн.`}</div>
            </div>
          </div>
          <div className="favorite_delete">
            <span className="close" onClick={() => this.handleDeleteItem(id)} />
          </div>
        </div>
      );
    });
  };
  render() {
    const { auth, favorites } = this.state;
    return (
      <div className="ht-wish-dropdown-content">
        <div className="ht-wish-dropdown__arrow" />
        {auth ? (
          <div className="ht-wish-dropdown-flex__favorites">
            <p className="ht-wish-dropdown__title">Cписок желаний</p>
            <div>{this.getFavorites()}</div>
          </div>
        ) : (
          <div className="ht-wish-dropdown-flex">
            <div className="ht-wish-dropdown__img">
              <InlineSVG
                src={`<svg class="icon-heart" data-name="icon-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.76 27.48"><defs><style>.icon-heart{fill:none;stroke:#b19354;stroke-linecap:square;stroke-miterlimit:10;stroke-width:1.5px;}</style></defs><title>icon-heart</title><path class="icon-heart" d="M8.2.75A7.45,7.45,0,0,0,2.93,13.47l13,13,13-13A7.45,7.45,0,0,0,18.29,2.93L15.88,5.35,13.47,2.93A7.4,7.4,0,0,0,8.2.75Z"></path></svg>`}
              />
            </div>
            <div className="ht-wish-dropdown__text">
              <p className="ht-wish-dropdown__title">Cписок желаний пуст</p>
              <p>
                Добавляйте товары в список желаний, делитесь списками с друзьями
                и обсуждайте товары вместе. Если у вас уже есть списки желаний,
                авторизуйтесь
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    favorites: state.favorites
  };
};
export default connect(
  mapStateToProps,
  { getFavorites, delFavorites, getItemFromStorage }
)(Favorites);
