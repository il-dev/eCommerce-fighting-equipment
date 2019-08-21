/*
example params
var params = {
    'userName': 'test@gmail.com',
    'password': 'Password!',
    'grant_type': 'password'
};
*/
export const formBody = params => {
  var formBody = [];
  for (var property in params) {
    if (property == "search" || property == "order") {
      var encodedKey = encodeURIComponent(property);
      formBody.push(encodedKey + "=" + JSON.stringify(params[property]));
    } else {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
  }
  formBody = formBody.join("&");
  return formBody;
};
export const orderToObject = orderValue => {
  if (orderValue == "brand-asc") return { brand: "asc" };
  if (orderValue == "brand-desc") return { brand: "desc" };
  if (orderValue == "code-asc") return { code: "asc" };
  if (orderValue == "code-desc") return { code: "desc" };
  if (orderValue == "price-desc") return { price: "desc" };
  if (orderValue == "price-asc") return { price: "asc" };
};
export const buildQueryPaginate = (query, page) => {
  let formBody = [];
  let newQuery = Object.assign({}, query);

  const encodedPageKey = encodeURIComponent("page");
  const encodedPageValue = encodeURIComponent(page);
  formBody.push(encodedPageKey + "=" + encodedPageValue);
  // console.log("buildQueryPaginate QUERY", query);
  // console.log("buildQueryPaginate PAGE", page);
  if (
    newQuery &&
    newQuery.id &&
    newQuery.category &&
    parseQuery(newQuery.id) == newQuery.category
  ) {
    delete newQuery.id;
    delete newQuery.category;
  } else if (
    newQuery &&
    newQuery.id &&
    newQuery.category &&
    parseQuery(newQuery.id) !== newQuery.category
  ) {
    delete newQuery.id;
  } else if (newQuery && newQuery.id && !newQuery.category) {
    delete newQuery.category;
    delete newQuery.id;
  }

  for (var property in newQuery) {
    if (property == "page" || !newQuery[property]) {
      continue;
    }

    const encodedKey = encodeURIComponent(property);
    formBody.push(encodedKey + "=" + newQuery[property]);
  }
  formBody = formBody.join("&");
  return formBody;
};
export const sliderMapped = slidesRow => {
  let sliderResult = { latest: {}, sale: {} };
  let latestIndex = 0;
  let saleIndex = 0;

  Object.keys(slidesRow.latest).map((key, index) => {
    const { name, link, link_article, price, base_price } = slidesRow.latest[
      key
    ];
    const id = slidesRow.latest[key].article_id;
    const photo = slidesRow.latest[key].photo.thumb;
    if (index % 3 == 0) {
      ++latestIndex;
    }
    if (!sliderResult.latest[latestIndex])
      sliderResult.latest[latestIndex] = [];
    sliderResult.latest[latestIndex].push({
      name,
      link,
      link_article,
      price,
      id,
      base_price,
      photo
    });
  });
  Object.keys(slidesRow.sale).map((key, index) => {
    const { name, link, link_article, price, base_price } = slidesRow.sale[key];
    const id = slidesRow.sale[key].article_id;
    const photo = slidesRow.sale[key].photo.thumb;
    if (index % 3 == 0) {
      ++saleIndex;
    }
    if (!sliderResult.sale[saleIndex]) sliderResult.sale[saleIndex] = [];

    sliderResult.sale[saleIndex].push({
      name,
      link,
      link_article,
      price,
      id,
      base_price,
      photo
    });
  });

  return sliderResult;
};
// export const sliderMapped = slidesRow => {
//   let sliderResult = [];
//   let index = 0;
//   for (const key in slidesRow) {
//     if (key == "latest") index = 0;
//     if (key == "sale") index = 1;

//     for (const id in slidesRow[key]) {
//       if (!sliderResult[index]) sliderResult[index] = {};
//       if (!sliderResult[index][id]) sliderResult[index][id] = {};
//       sliderResult[index][id]["name"] = slidesRow[key][id].name;
//       sliderResult[index][id]["link"] = slidesRow[key][id].link;
//       sliderResult[index][id]["link_article"] = slidesRow[key][id].link_article;
//       sliderResult[index][id]["photo"] = slidesRow[key][id].photo.thumb;
//       sliderResult[index][id]["price"] = slidesRow[key][id].price;
//       sliderResult[index][id]["id"] = slidesRow[key][id].article_id;
//       sliderResult[index][id]["base_price"] = slidesRow[key][id].base_price;
//     }
//   }
//   if (!slidesRow["latest"]) sliderResult[1] = {};
//   console.log("OLD sliderResult", sliderResult);
//   return sliderResult;
// };

export const mapBrands = brandsRaw => {
  let topBrands = {};
  let restBrands = [];
  for (let key in brandsRaw) {
    switch (brandsRaw[key]) {
      case "EVERLAST":
        topBrands["1"] = { id: key, brand: brandsRaw[key] };
        break;
      case "VENUM":
        topBrands["2"] = { id: key, brand: brandsRaw[key] };
        break;
      case "TITLE":
        topBrands["3"] = { id: key, brand: brandsRaw[key] };
        break;
      case "CLETO REYES":
        topBrands["4"] = { id: key, brand: brandsRaw[key] };
        break;
      case "FIGHTING SPORTS":
        topBrands["5"] = { id: key, brand: brandsRaw[key] };
        break;
      case "FAIRTEX":
        topBrands["6"] = { id: key, brand: brandsRaw[key] };
        break;
      case "ShockDoctor":
        topBrands["7"] = { id: key, brand: brandsRaw[key] };
        break;
      case "ADIDAS":
        topBrands["8"] = { id: key, brand: brandsRaw[key] };
        break;
      default:
        restBrands.push({ id: key, brand: brandsRaw[key] });
        break;
    }
  }
  return { topBrands, restBrands };
};

export const parseQuery = query => {
  const reg = /\d+(?=\D*$)/;

  const id = query.match(reg);
  return parseInt(id);
};

export const unescapeHtml = safe => {
  if (safe === "" || !safe) return "";
  return safe
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
};

export const mapProductsAndAmount = goods => {
  let result = {};
  goods.forEach(item => {
    result[item.goods_id] = item.amount;
  });
  return result;
};

export const parseSearchResults = search => {
  let result = [];
  if (search == undefined || Object.keys(search).length == 0) return result;
  Object.keys(search).map(key => {
    const { article, link_article, photo, name } = search[key];
    const { thumb } = photo;
    result.push({ name, thumb, article, link_article });
  });
  return result;
};
export const mapRating = data => {
  let result = {};
  Object.keys(data).map(key => {
    result[key] = +data[key] * 20;
  });
  return result;
};

/* VALIDATE REGISTRATION */
export const validateRegistration = data => {
  const { phone, password, passwordRepeat, fio, address, email } = data;
  let result = {
    phone: true,
    password: true,
    passwordRepeat: true,
    fio: true,
    address: true,
    email: true
  };
  if (fio.length < 5) result.fio = "error";
  if (!validateEmail(email)) result.email = "error";
  if (!validatePhone(phone)) result.phone = "error";
  if (password.length < 4) result.password = "error";
  if (passwordRepeat !== password) result.passwordRepeat = "error";
  // console.log('data', data);
  // console.log('result', result);
  return result;
};
export const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
export const validatePhone = phone => {
  return (
    phone.match(/^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/) !=
    null
  );
};

export const serialize = obj => {
  let str = Object.entries(obj)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");
  return str;
};
export const buildQueryCatalog = query => {
  let newQueryObject = Object.assign({}, query);
  if (query.limit) newQueryObject.limit = query.limit;
  if (query.order) newQueryObject.order = query.order;
  if (query.id) newQueryObject.category = parseQuery(query.id);
  let str = "";
  if (newQueryObject.category) {
    str += `/shop/?category=${newQueryObject.category}`;
  } else {
    str += `/shop/?`;
  }

  Object.keys(newQueryObject).map((key, index) => {
    if (key != "id" && key != "category" && index == 0) {
      str += `${key}=${newQueryObject[key]}`;
    } else if (key != "id" && key != "category") {
      str += `&${key}=${newQueryObject[key]}`;
    }
  });
  return str;
};
/* SERIALIZE FROM OBJECT TU QUERY STRING */
export const clearQueryData = query => {
  let clearQuery = {};
  Object.keys(query).forEach(key => {
    if (key == "id") {
      clearQuery["category"] = parseQuery(query[key]);
    } else if (key != "data") {
      clearQuery[key] = query[key];
    }
  });
  return clearQuery;
};

/* MAP */

export const mapCategory = categoryRaw => {
  let result = {};
  result.map = {};
  Object.keys(categoryRaw).map(function(key) {
    const parent_id = categoryRaw[key].parent_id;
    const id = categoryRaw[key].id;
    const link = categoryRaw[key].link;
    const name = categoryRaw[key].name;
    if (parent_id == 0) {
      if (!result["parents"]) result["parents"] = {};
      if (!result["parents"][id]) result["parents"][id] = {};
      result["parents"][id]["id"] = id;
      result["parents"][id]["link"] = link;
      result["parents"][id]["name"] = name;
      result.map[id] = parent_id;
    } else {
      if (!result["childs"]) result["childs"] = {};
      if (!result["childs"][parent_id]) result["childs"][parent_id] = {};
      if (!result["childs"][parent_id][id])
        result["childs"][parent_id][id] = {};

      result["childs"][parent_id][id]["id"] = id;
      result["childs"][parent_id][id]["link"] = link;
      result["childs"][parent_id][id]["name"] = name;
      result.map[id] = parent_id;
    }
  });
  return result;
};
export const mapBrandsRaw = brandsRaw => {
  let topBrands = {};
  let restBrands = [];
  for (let i = 0; i < brandsRaw.length; i++) {
    switch (brandsRaw[i].brand) {
      case "EVERLAST":
        topBrands["1"] = brandsRaw[i];
        break;
      case "VENUM":
        topBrands["2"] = brandsRaw[i];
        break;
      case "TITLE":
        topBrands["3"] = brandsRaw[i];
        break;
      case "CLETO REYES":
        topBrands["4"] = brandsRaw[i];
        break;
      case "FIGHTING SPORTS":
        topBrands["5"] = brandsRaw[i];
        break;
      case "FAIRTEX":
        topBrands["6"] = brandsRaw[i];
        break;
      case "ShockDoctor":
        topBrands["7"] = brandsRaw[i];
        break;
      case "ADIDAS":
        topBrands["8"] = brandsRaw[i];
        break;
      default:
        restBrands.push(brandsRaw[i]);
        break;
    }
  }
  return { topBrands, restBrands };
};
export const mapStores = storesRaw => {
  let result = {};
  storesRaw.forEach(item => {
    result[item.id] = item;
  });
  return result;
};
export const mapBreadcrumbs = categoryRaw => {
  let result = {};
  Object.keys(categoryRaw).map(function(key) {
    const { name, link, parent_id } = categoryRaw[key];
    if (!result[key]) result[key] = [];
    if (parent_id == 0) {
      result[key].push(
        { name: "Главная", link: "/" },
        { name: "Каталог", link: "/shop/" },
        { name: name, link: link }
      );
    } else {
      const { name: categoryName, link: categoryLink } = categoryRaw[parent_id];
      result[key].push(
        { name: "Главная", link: "/" },
        { name: "Каталог", link: "/shop/" },
        { name: categoryName, link: categoryLink },
        { name: name, link: link }
      );
    }
  });
  return result;
};
export const mapColors = colorsRaw => {
  let result = {};
  for (let i = 0; i < colorsRaw.length; i++) {
    result[colorsRaw[i].id] = colorsRaw[i].color;
  }
  return result;
};
export const mapSizes = sizesRaw => {
  let result = {};
  for (let i = 0; i < sizesRaw.length; i++) {
    result[sizesRaw[i].id] = sizesRaw[i].size;
  }
  return result;
};

export const getMetadata = (data, categoryId) => {
  if (
    !categoryId ||
    !data ||
    !data[categoryId] ||
    categoryId.split(",").length > 1
  ) {
    return {
      meta_title: "Каталог товаров",
      meta_description:
        "Каталог товаров для единоборств по доступной цене в интернет-магазине (г. Киев)"
    };
  }
  const { meta_title, meta_description, name } = data[categoryId];
  return { meta_title, meta_description, name };
};

// FAVORITES
export const mapFavorites = rawFavorites => {
  let result = [];
  if (!rawFavorites || rawFavorites.length == 0) return [];
  Object.keys(rawFavorites).map(item => {
    const { article_id, name, price, link_article } = rawFavorites[item];
    const { thumb } = rawFavorites[item].photo;
    result.push({
      id: article_id,
      link_article,
      price,
      thumb,
      name
    });
  });
  return result;
};

// NEW ROUTER FROM FILTER
export const newRouteFromFilter = (filter, checkedFilter, query) => {
  let newQueryObject = Object.assign({}, query);
  if (Object.keys(query).length == 0 && filter != "price") {
    return {
      as: `/shop/?${filter}=${checkedFilter.name}`,
      query: { [filter]: checkedFilter.name }
    };
  }
  if (Object.keys(query).length == 0 && filter == "price") {
    return {
      as: `/shop/?${filter}=${checkedFilter.value}`,
      query: { [filter]: checkedFilter.value }
    };
  }
  if (query[filter] && checkedFilter.value == true) {
    newQueryObject[filter] = `${query[filter]},${checkedFilter.name}`;
  } else if (query[filter] && checkedFilter.value == false) {
    const paramsArray = query[filter].split(",");
    let newFilterParams = [];
    paramsArray.forEach(item => {
      if (item !== checkedFilter.name) {
        newFilterParams.push(item);
      }
    });
    newQueryObject[filter] = newFilterParams.join(",");
    if (Object.keys(newQueryObject[filter]).length == 0)
      delete newQueryObject[filter];
  } else if (filter == "price") {
    newQueryObject[filter] = checkedFilter.value;
  } else {
    newQueryObject[filter] = checkedFilter.name;
  }
  if (newQueryObject.page) newQueryObject.page = 1;
  return { as: `/shop/?${serialize(newQueryObject)}`, query: newQueryObject };
};
// PARSE QUERY TO FILTERS
export const parseQueryToFilters = query => {
  let result = {};
  if (query.id) {
    result["categoryFilter"] = {};
    result["categoryFilter"][parseQuery(query.id)] = { isChecked: true };
    return result;
  }
  Object.keys(query).map(key => {
    query[key].split(",").map(item => {
      let filterName = "";
      if (key == "brand") filterName = "brandFilter";
      if (key == "size") filterName = "sizeFilter";
      if (key == "color") filterName = "colorFilter";
      if (key == "category") filterName = "categoryFilter";
      if (key == "price") {
        filterName = "rangeFilterValue";
      }
      if (!result[filterName]) result[filterName] = {};
      if (key == "price") {
        result[filterName]["min"] = query[key].split("-")[0];
        result[filterName]["max"] = query[key].split("-")[1];
      } else {
        result[filterName][item] = { isChecked: true };
      }
    });
  });
  return result;
};
// CLEAR PRODUCTS IN CATALOG
export const clearProducts = products => {
  let result = {};
  if (products == null || !products) return result;
  if (Object.keys(products).length == 0) return false;
  Object.keys(products).map(key => {
    const {
      article_id,
      article,
      name,
      base_price,
      discount,
      price,
      goods_amount,
      goods_id,
      size_id,
      color_id,
      size,
      color,
      link,
      link_article,
      article_photo
    } = products[key];
    let thumb;
    if (typeof products[key].article_photo === "array") {
      thumb = products[key].article_photo.thumb;
    } else {
      thumb = products[key].photo.thumb;
    }
    // const { thumb } = products[key].photo;
    result[key] = {
      article_id,
      article,
      name,
      base_price,
      discount,
      price,
      goods_amount,
      goods_id,
      size_id,
      color_id,
      size,
      color,
      link,
      link_article
    };
    result[key].photo = { thumb };
  });
  return result;
};

export const clearOneProduct = product => {
  let newDataGoods = {};
  if (product == null) return newDataGoods;
  const itemKey = Object.keys(product)[0];
  const {
    article,
    article_id,
    article_info,
    base_price,
    discount,
    goods_id,
    link,
    link_article,
    name,
    price,
    category_id,
    description,
    title,
    data_goods,
    article_photo
  } = product[itemKey];

  let large;
  if (product[itemKey].article_photo.length !== 0) {
    large = product[itemKey].article_photo;
  } else {
    large = product[itemKey].photo;
  }

  newDataGoods[itemKey] = {
    article,
    article_id,
    article_info,
    base_price,
    discount,
    goods_id,
    link,
    link_article,
    name,
    price,
    category_id,
    description,
    title
  };
  newDataGoods[itemKey].photo = { ...large };
  Object.keys(data_goods).map(key => {
    const {
      article,
      article_id,
      color,
      color_id,
      goods_id,
      link,
      link_article,
      size,
      size_id,
      store_id,
      store
    } = data_goods[key];
    const { thumb, large } = data_goods[key].photo;
    if (!newDataGoods[itemKey].data_goods)
      newDataGoods[itemKey].data_goods = {};

    newDataGoods[itemKey].data_goods[key] = {
      article,
      article_id,
      color,
      color_id,
      goods_id,
      link,
      link_article,
      size,
      size_id,
      store_id,
      store
    };
    newDataGoods[itemKey].data_goods[key].photo = { thumb, large };
  });
  return newDataGoods;
};
// FORMAT DATE IN HISTORY
export const formatDate = rawDate => {
  let newDate = rawDate.slice(0, 10);
  newDate = newDate
    .split("-")
    .reverse()
    .join(".");
  return newDate;
};

// Map order history
export const mapOrderHistory = orders => {
  let result = [];
  if (Object.keys(orders).length == 0) return result;
  Object.keys(orders).map(orderKey => {
    const orderId = Object.keys(orders[orderKey].order)[0];
    result.push(orders[orderKey].order[orderId]);
  });
  return result.reverse();
};
