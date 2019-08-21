import React from "react";
import Slider from "react-slick";
import InlineSVG from "svg-inline-react";
import Link from "next/link";

function NextArrow(props, key) {
  const { onClick } = props;
  return (
    <button className={"slick-left-btn"} onClick={onClick}>
      <InlineSVG
        src={`<svg id="icon-left-arrow" viewBox="0 0 32 32" width="100%" height="100%">
<title>left-arrow</title>
<path fill="#b19354" d="M21.978 30.090c0.198 0.198 0.447 0.298 0.719 0.298s0.521-0.099 0.719-0.298c0.397-0.397 0.397-1.042 0-1.439l-12.651-12.651 12.651-12.651c0.397-0.397 0.397-1.042 0-1.439s-1.042-0.397-1.439 0l-13.395 13.371c-0.397 0.397-0.397 1.042 0 1.439l13.395 13.371z"></path>
</svg>`}
      />
    </button>
  );
}

function PrevArrow(props, key) {
  const { onClick } = props;
  return (
    <button className={"slick-right-btn"} onClick={onClick}>
      <InlineSVG
        src={`<svg id="icon-right-arrow" viewBox="0 0 32 32" width="100%" height="100%">
<title>right-arrow</title>
<path fill="#b19354" d="M10.022 30.090c-0.198 0.198-0.447 0.298-0.719 0.298s-0.521-0.099-0.719-0.298c-0.397-0.397-0.397-1.042 0-1.439l12.651-12.651-12.651-12.651c-0.397-0.397-0.397-1.042 0-1.439s1.042-0.397 1.439 0l13.371 13.371c0.397 0.397 0.397 1.042 0 1.439l-13.371 13.371z"></path>
</svg>`}
      />
    </button>
  );
}
export default class BrandSlider extends React.Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      slidesToShow: 7,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      className: "brand-slider",
      responsive: [
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 450,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <Slider {...settings} swipeToSlide={true} arrow={true} infinite={true}>
        <div className="brand-slider__item">
          <Link
            href={{ pathname: "/Catalog", query: { brand: 8 } }}
            as={`/shop/?brand=8`}
          >
            <a href="/shop/?brand=8">
              <img
                src="/static/img/brands/Everlast-logo-2011_svg.jpg"
                alt="Everlast"
              />
            </a>
          </Link>
        </div>
        <div className="brand-slider__item">
          <Link
            href={{ pathname: "/Catalog", query: { brand: 122 } }}
            as={`/shop/?brand=122`}
          >
            <a href="/shop/?brand=122">
              <img src="/static/img/brands/CletoReyes.jpg" alt="CletoReyes" />
            </a>
          </Link>
        </div>
        <div className="brand-slider__item">
          <Link
            href={{ pathname: "/Catalog", query: { brand: 44 } }}
            as={`/shop/?brand=44`}
          >
            <a href="/shop/?brand=44">
              <img src="/static/img/brands/Venum.jpg" alt="Venum" />
            </a>
          </Link>
        </div>
        <div className="brand-slider__item">
          <Link
            href={{ pathname: "/Catalog", query: { brand: 3 } }}
            as={`/shop/?brand=3`}
          >
            <a href="/shop/?brand=3">
              <img src="/static/img/brands/TITLE.jpg" alt="TITLE" />
            </a>
          </Link>
        </div>
        <div className="brand-slider__item">
          <Link
            href={{ pathname: "/Catalog", query: { brand: 21 } }}
            as={`/shop/?brand=21`}
          >
            <a href="/shop/?brand=21">
              <img
                src="/static/img/brands/Shock-Doctor-logo.jpg"
                alt="Shock-Doctor"
              />
            </a>
          </Link>
        </div>
        <div className="brand-slider__item">
          <Link
            href={{ pathname: "/Catalog", query: { brand: 51 } }}
            as={`/shop/?brand=51`}
          >
            <a href="/shop/?brand=51">
              <img
                src="/static/img/brands/Fighting-Sports-Logo.jpg"
                alt="Fighting-Sports"
              />
            </a>
          </Link>
        </div>
        <div className="brand-slider__item">
          <Link
            href={{ pathname: "/Catalog", query: { brand: 31 } }}
            as={`/shop/?brand=31`}
          >
            <a href="/shop/?brand=31">
              <img src="/static/img/brands/Rival.jpg" alt="Rival" />
            </a>
          </Link>
        </div>
        <div className="brand-slider__item">
          <Link
            href={{ pathname: "/Catalog", query: { brand: 78 } }}
            as={`/shop/?brand=78`}
          >
            <a href="/shop/?brand=78">
              <img src="/static/img/brands/fairtex_logo.jpg" alt="fairtex" />
            </a>
          </Link>
        </div>
      </Slider>
    );
  }
}
