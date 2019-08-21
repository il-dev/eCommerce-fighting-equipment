import React, { Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";

class AsideRight extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="aside__block_img">
        <div className="aside__block_img-item">
          <Link
            href={{ pathname: "/Coach" }}
            as={`/page/individualnoe-predlozhenie-dlya-trenerov/`}
          >
            <a
              className="aside__block_img-item-link"
              href="/page/individualnoe-predlozhenie-dlya-trenerov/"
            >
              <img src="/static/img/trener_240x350.jpg" alt="Discount!" />
            </a>
          </Link>
        </div>
        {this.getVringeAdv()}
        <div className="aside__block_img-item">
          <Link href={{ pathname: "/ToCostumers" }} as={`/page/pokupatelyam/`}>
            <a
              className="aside__block_img-item-link"
              href="/page/pokupatelyam/"
            >
              <img
                src="/static/img/original_54196e404e2ae.gif"
                alt="Discount!"
              />
            </a>
          </Link>
        </div>
        <div className="aside__block_img-item">
          <img src="/static/img/original_54be619a8097c.gif" alt="Discount!" />
        </div>
        <div className="aside__block_img-item">
          <Link
            href={{ pathname: "/Catalog", query: { promos: true } }}
            as={`/shop/?promos=true/`}
          >
            <a
              className="aside__block_img-item-link"
              href="/shop/?promos=true/"
            >
              <img
                src="/static/img/original_551911d2ae3bd.gif"
                alt="Hall of Fame"
              />
            </a>
          </Link>
        </div>
      </div>
    );
  }
  getVringeAdv = () => {
    const { adv } = this.props;
    let items = [];
    if (adv == undefined || adv.length == 0) return false;
    for (let i = 0; i < 3; i++) {
      items.push(
        <div key={adv[i].link} className="veringe-item">
          <div className="vringe-img">
            <a rel="nofollow" target="_blank" href={adv[i].link}>
              <img src={adv[i].image} />
            </a>
          </div>
          <div>
            <a
              rel="nofollow"
              className="vringe-link"
              target="_blank"
              href={adv[i].link}
            >
              {adv[i].title}
            </a>
          </div>
        </div>
      );
    }
    return (
      <div className="aside__block_img-item">
        <p className="vringe-title">Новости партнеров:</p>
        {items}
      </div>
    );
  };
}

const mapStateToProps = state => {
  return state.adv;
};
export default connect(mapStateToProps)(AsideRight);
