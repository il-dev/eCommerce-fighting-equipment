import Link from "next/link";
import { prefixForSources } from "../../constants";
import InlineSVG from "svg-inline-react";

function CustomView(props) {
  const { products, sizes, loading, rating } = props;
  return Object.keys(products).map(key => {
    const photo = products[key].photo.thumb;
    const {
      link_article: link,
      name,
      article,
      price,
      article_id,
      discount,
      base_price,
      size_id
    } = products[key];
    let sizesArr = [];
    if (size_id !== "") {
      sizesArr = size_id.split(",").map(item => {
        const size = sizes[item];
        return <span key={size} dangerouslySetInnerHTML={{ __html: size }} />;
      });
    } else {
      sizesArr = <span>Один размер</span>;
    }
    return (
      <div
        className={
          loading
            ? "products-item products-item-border custom-view opacity-category"
            : "products-item products-item-border custom-view"
        }
        key={article_id}
      >
        <div className="products-item__img">
          <Link
            href={{ pathname: `/Product`, query: { id: link } }}
            as={`${link}`}
          >
            <a href={link}>
              <img src={`${prefixForSources}${photo}`} alt={name} />
            </a>
          </Link>
          {discount > 0 ? (
            <div className="corner-ribbon top-left sticky red shadow">
              -{discount}%
            </div>
          ) : null}
        </div>
        <div className="custom-view-info-wrapper">
          <Link
            href={{ pathname: `/Product`, query: { id: link } }}
            as={`${link}`}
          >
            <a href={link} className="products-title__link">
              <h3
                className="products-item__title"
                dangerouslySetInnerHTML={{ __html: name }}
              />
            </a>
          </Link>
          <div className="custom-view-price">
            {discount == 0 ? (
              <div className="products-item__old-price" />
            ) : (
              <div className="products-item__old-price">{`${Math.round(
                base_price
              )} грн`}</div>
            )}
            <div className="products-item__price">
              {price} <span>грн</span>
            </div>
            <div className="products-item__buttons">
              <button
                type="button"
                className="products-wish__btn"
                onClick={() => {
                  props.addToFavorites(article_id);
                }}
              >
                <InlineSVG
                  src={`<svg class="icon-wish" data-name="icon-wish" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.76 27.48"><defs><style>.icon-wish{fill:none;stroke:#b19354;stroke-linecap:square;stroke-miterlimit:10;stroke-width:1.5px;}</style></defs><path class="icon-wish" d="M8.2.75A7.45,7.45,0,0,0,2.93,13.47l13,13,13-13A7.45,7.45,0,0,0,18.29,2.93L15.88,5.35,13.47,2.93A7.4,7.4,0,0,0,8.2.75Z"/></svg>`}
                />
              </button>
              <Link
                href={{ pathname: `/Product`, query: { id: link } }}
                as={`${link}`}
              >
                <a href={link} className="products-buy__btn">
                  КУПИТЬ
                </a>
              </Link>
            </div>
          </div>
          <div className="custom-view-descr">
            <div className="products-item__code">
              <span>Код: </span>
              {article}
            </div>
            <div className="products-item__size">Размеры: {sizesArr}</div>
          </div>
          <div className="custom-view-review">
            <div className="products-item__stock out-of-stock">В наличии</div>
            <div className="products-item__rate">
              <a href="#" className="products-item__feedbacks">
                отзывы
                <span className="products-item__feedbacks-count">
                  {/* 23 */}
                </span>
              </a>
              <div className="star-ratings-css">
                <div
                  className="star-ratings-css-top"
                  style={{ width: `${rating[article_id]}%` }}
                >
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <div className="star-ratings-css-bottom">
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
}

export default CustomView;
