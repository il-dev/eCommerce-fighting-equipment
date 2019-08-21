import React from "react";
import Slider from "react-slick";
import ReactSVG from "react-svg";
import { prefixForSources } from "../constants";
import Link from "next/link";
function NextArrow(props, key) {
  const { onClick } = props;
  return (
    <button className={"slick-left-btn"} onClick={onClick}>
      <ReactSVG
        src="../../static/img/icons/left-arrow.svg"
        className="icon icon-left-arrow"
      />
    </button>
  );
}

function PrevArrow(props, key) {
  const { onClick } = props;
  return (
    <button className={"slick-right-btn"} onClick={onClick}>
      <ReactSVG
        src="../../static/img/icons/right-arrow.svg"
        className="icon icon-right-arrow"
      />
    </button>
  );
}
class SliderMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navSliderSale: null,
      navSliderLatest: null,
      mainSliderSale: null,
      mainSliderLatest: null,
      activeSlideIndex: 0,
      latestIsNoEmpty: true
    };
  }

  componentDidMount() {
    this.setState({
      navSliderSale: this.navSliderSale,
      navSliderLatest: this.navSliderLatest,
      mainSliderSale: this.mainSliderSale,
      mainSliderLatest: this.mainSliderLatest,
      latestIsNoEmpty:
        Object.keys(
          this.props.slides.latest && Object.keys(this.props.slides.latest)
        ).length > 0
          ? true
          : false
    });
  }
  getSliderNav = slederText => {
    const { activeSlideIndex } = this.state;
    return (
      <div className="main-slider-nav__item active">
        {activeSlideIndex == 0 ? (
          <Slider
            centerMode={true}
            variableWidth={true}
            swipeToSlide={true}
            focusOnSelect={true}
            slidesToShow={5}
            asNavFor={this.state.mainSliderLatest}
            ref={slider => (this.navSliderLatest = slider)}
          >
            <div className="slick-dots-custom">
              <span>&bull;</span>
            </div>
            <div className="slick-dots-custom">
              <span>&bull;</span>
            </div>
            <div className="slick-dots-custom">
              <span>&bull;</span>
            </div>
            <div className="slick-dots-custom">
              <span>&bull;</span>
            </div>
            <div className="slick-dots-custom">
              <span>&bull;</span>
            </div>
          </Slider>
        ) : (
          <Slider
            centerMode={true}
            variableWidth={true}
            swipeToSlide={true}
            focusOnSelect={true}
            slidesToShow={5}
            asNavFor={this.state.mainSliderSale}
            ref={slider => (this.navSliderSale = slider)}
          >
            <div className="slick-dots-custom">
              <span>&bull;</span>
            </div>
            <div className="slick-dots-custom">
              <span>&bull;</span>
            </div>
            <div className="slick-dots-custom">
              <span>&bull;</span>
            </div>
            <div className="slick-dots-custom">
              <span>&bull;</span>
            </div>
            <div className="slick-dots-custom">
              <span>&bull;</span>
            </div>
          </Slider>
        )}

        <button
          onClick={this.changeSliderIndex}
          type="button"
          className="main-slider-nav__text"
        >
          {slederText}
        </button>
      </div>
    );
  };
  getFackeDots = (slederText, index) => {
    return (
      <div className="main-slider-nav__item">
        <div className="fake-dots-wrapper">
          <div className="fake-dots-custom">
            <span>&bull;</span>
          </div>
          <div className="fake-dots-custom">
            <span>&bull;</span>
          </div>
          <div className="fake-dots-custom">
            <span>&bull;</span>
          </div>
          <div className="fake-dots-custom">
            <span>&bull;</span>
          </div>
          <div className="fake-dots-custom">
            <span>&bull;</span>
          </div>
        </div>
        <button
          type="button"
          className="main-slider-nav__text"
          onClick={this.changeSliderIndex}
        >
          {slederText}
        </button>
      </div>
    );
  };
  changeSliderIndex = () => {
    const { activeSlideIndex } = this.state;
    if (activeSlideIndex == 0) {
      this.setState({
        ...this.state,
        activeSlideIndex: 1
      });
    } else {
      this.setState({
        ...this.state,
        activeSlideIndex: 0
      });
    }
  };
  getSliderBody = () => {
    const { activeSlideIndex } = this.state;
    let slides;
    if (activeSlideIndex == 0) {
      slides = this.props.slides.latest;
    } else {
      slides = this.props.slides.sale;
    }

    return Object.keys(slides).map(key => {
      return (
        <div key={key}>
          <div className="main-slider__items-wrapper">
            {slides[key].map(item => {
              const { base_price, link_article, name, photo, price, id } = item;
              return (
                <div key={id} className="main-slider__item">
                  <Link
                    href={{
                      pathname: "/Product",
                      query: { id: link_article }
                    }}
                    as={link_article}
                  >
                    <a href={link_article} className="main-slider__item-title">
                      <h3 dangerouslySetInnerHTML={{ __html: name }} />
                    </a>
                  </Link>
                  <Link
                    href={{
                      pathname: "/Product",
                      query: { id: link_article }
                    }}
                    as={link_article}
                  >
                    <a href={link_article} className="main-slider-img">
                      <img src={`${prefixForSources}${photo}`} alt={name} />
                    </a>
                  </Link>
                  <div className="main-slider-priec_wrapper">
                    {price == base_price ? null : (
                      <div className="main-slider__item_old-price">
                        <span>{base_price}</span>
                        <span>&nbsp;грн</span>
                      </div>
                    )}
                    <div>
                      <span className="main-slider__item_price">{price}</span>
                      <span>&nbsp;грн</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.activeSlideIndex == 1 && this.state.navSliderSale == null) {
      this.setState({
        ...this.state,
        navSliderSale: this.navSliderSale,
        mainSliderSale: this.mainSliderSale,
        navSliderLatest: null,
        mainSliderLatest: null
      });
    }
    if (
      this.state.activeSlideIndex == 0 &&
      this.state.navSliderLatest == null
    ) {
      this.setState({
        ...this.state,
        navSliderSale: null,
        mainSliderSale: null,
        navSliderLatest: this.navSliderLatest,
        mainSliderLatest: this.mainSliderLatest
      });
    }
  }
  render() {
    const settings = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true,
      // dots: false,
      adaptiveHeight: true,
      className: "main-slider",
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 4000,
      cssEase: "linear"
    };
    const { activeSlideIndex, latestIsNoEmpty } = this.state;
    return (
      <div>
        {activeSlideIndex == 0 ? (
          <Slider
            {...settings}
            asNavFor={this.state.navSliderLatest}
            ref={slider => (this.mainSliderLatest = slider)}
          >
            {this.getSliderBody()}
          </Slider>
        ) : (
          <Slider
            {...settings}
            asNavFor={this.state.navSliderSale}
            ref={slider => (this.mainSliderSale = slider)}
            dots={false}
          >
            {this.getSliderBody()}
          </Slider>
        )}
        <div className="main-slider-nav">
          {latestIsNoEmpty && activeSlideIndex == 0
            ? this.getSliderNav("НОВИНКИ")
            : null}
          {latestIsNoEmpty && activeSlideIndex == 1
            ? this.getFackeDots("НОВИНКИ", 0)
            : null}
          {activeSlideIndex == 1
            ? this.getSliderNav("РАСПРОДАЖА")
            : this.getFackeDots("РАСПРОДАЖА", 1)}
        </div>
      </div>
    );
  }
}
export default SliderMain;
