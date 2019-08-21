import Link from "next/link";

export default class MobileMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  closeDrawer = () => {
    this.props.closeDrawer();
  };
  handleCategoryOpen = e => {
    e.preventDefault();
    this.props.openMobilCategory();
  };
  render() {
    return (
      <ul className="mobile-nav__list">
        <li onClick={this.closeDrawer}>
          <Link href={{ pathname: "/index" }} as="/">
            <a href="/">Главная</a>
          </Link>
        </li>
        <li>
          <a href="/shop/" onClick={this.handleCategoryOpen}>
            Каталог
          </a>
        </li>
        <li onClick={this.closeDrawer}>
          <Link
            href={{ pathname: "/Catalog", query: { promos: true } }}
            as="/shop/?promos=true"
          >
            <a href="/shop/?promos=true">Распродажи и акции</a>
          </Link>
        </li>
        <li onClick={this.closeDrawer}>
          <Link href={{ pathname: "/Shops" }} as="/page/shops/">
            <a href="/page/shops/">Магазины</a>
          </Link>
        </li>
        <li onClick={this.closeDrawer}>
          <Link href={{ pathname: "/Delivery" }} as="/page/howto-deliver/">
            <a href="/page/howto-deliver/">Доставка и оплата</a>
          </Link>
        </li>
        <li onClick={this.closeDrawer}>
          <Link href={{ pathname: "/Warranty" }} as="/page/garantiya/">
            <a href="/page/garantiya/">Гарантия</a>
          </Link>
        </li>
        <li onClick={this.closeDrawer}>
          <Link href={{ pathname: "/Contacts" }} as="/contacts/">
            <a href="/contacts/">Контакты</a>
          </Link>
        </li>
      </ul>
    );
  }
}
