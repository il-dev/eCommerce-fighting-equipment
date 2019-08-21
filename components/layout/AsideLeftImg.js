import React from "react";
import Link from "next/link";
export default () => (
  <div className="aside__block_img">
    <Link
      href={{ pathname: "/Coach" }}
      as={`/page/individualnoe-predlozhenie-dlya-trenerov/`}
    >
      <a href="/page/individualnoe-predlozhenie-dlya-trenerov/">
        <img src="static/img/original_55017adc1a128.jpg" alt="Discount!" />
      </a>
    </Link>
    <Link href={{ pathname: "/ToCostumers" }} as={`/page/pokupatelyam/`}>
      <a href="/page/pokupatelyam/">
        <img src="static/img/original_54196e404e2ae.gif" alt="Discount!" />
      </a>
    </Link>
  </div>
);
