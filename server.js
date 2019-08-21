const express = require("express");
const next = require("next");
const LRUCache = require("lru-cache");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: ".", dev });
const handle = app.getRequestHandler();
const compression = require("compression");

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
});

app.prepare().then(() => {
  const server = express();
  // Use the `renderAndCache` utility defined below to serve pages

  server.use(compression());
  server.get("/", (req, res) => {
    renderAndCache(req, res, "/");
  });

  server.get("/shop/", (req, res) => {
    renderAndCache(req, res, "/Catalog", req.query);
  });
  server.get("/shop/:id/", (req, res) => {
    const category = `${parseQuery(req.params.id)}`;
    const queryParams = { id: req.params.id, category: category, ...req.query };
    renderAndCache(req, res, "/Catalog", queryParams);
  });

  server.get("/product/:id", (req, res) => {
    const queryParams = { id: req.params.id, ...req.query };
    renderAndCache(req, res, "/Product", queryParams);
  });
  server.get("/page/shops/", (req, res) => {
    renderAndCache(req, res, "/Shops", req.query);
  });
  server.get("/page/howto-deliver/", (req, res) => {
    renderAndCache(req, res, "/Delivery", req.query);
  });
  server.get("/page/howto-size/", (req, res) => {
    renderAndCache(req, res, "/HowToSize", req.query);
  });
  server.get("/page/garantiya/", (req, res) => {
    renderAndCache(req, res, "/Warranty", req.query);
  });
  server.get("/page/nashi-klienty/", (req, res) => {
    renderAndCache(req, res, "/Clients", req.query);
  });
  server.get("/page/individualnoe-predlozhenie-dlya-trenerov/", (req, res) => {
    renderAndCache(req, res, "/Coach", req.query);
  });
  server.get("/page/discounts/", (req, res) => {
    renderAndCache(req, res, "/Sales", req.query);
  });
  server.get("/page/partners/", (req, res) => {
    renderAndCache(req, res, "/Partners", req.query);
  });
  server.get("/page/howto-order/", (req, res) => {
    renderAndCache(req, res, "/HowToOrder", req.query);
  });
  server.get("/page/howto-pay/", (req, res) => {
    renderAndCache(req, res, "/HowToPay", req.query);
  });
  server.get("/page/howto-deliver/", (req, res) => {
    renderAndCache(req, res, "/Delivery", req.query);
  });
  server.get("/page/howto-size/", (req, res) => {
    renderAndCache(req, res, "/HowToSize", req.query);
  });
  server.get("/page/pravila-ispolzovaniya-produkcii/", (req, res) => {
    renderAndCache(req, res, "/Rules", req.query);
  });
  server.get("/page/pokupatelyam/", (req, res) => {
    renderAndCache(req, res, "/ToCostumers", req.query);
  });
  server.get("/contacts/", (req, res) => {
    renderAndCache(req, res, "/Contacts", req.query);
  });
  server.get("/checkout/", (req, res) => {
    renderAndCache(req, res, "/Checkout", req.query);
  });
  server.get("/checkout/order-done/:id", (req, res) => {
    const queryParams = { id: req.params.id, ...req.query };
    renderAndCache(req, res, "/PayDone", queryParams);
  });
  server.get("/user/", (req, res) => {
    renderAndCache(req, res, "/User", req.query);
  });
  server.get("/user/history/", (req, res) => {
    renderAndCache(req, res, "/UserHistory", req.query);
  });
  const options = {
    root: __dirname + "/static/",
    headers: {
      "Content-Type": "text/plain;charset=UTF-8"
    }
  };
  server.get("/robots.txt", (req, res) =>
    res.status(200).sendFile("robots.txt", options)
  );
  server.get("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.url}`;
}

async function renderAndCache(req, res, pagePath, queryParams) {
  const key = getCacheKey(req);
  // If we have a page in the cache, let's serve it
  // if (ssrCache.has(key)) {
  //   res.setHeader("x-cache", "HIT");
  //   res.send(ssrCache.get(key));
  //   return;
  // }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams);

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }

    // Let's cache this page
    // ssrCache.set(key, html);

    res.setHeader("x-cache", "MISS");
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams);
  }
}

// HELPERS
function formBody(params) {
  var formBody = [];
  for (var property in params) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(params[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return formBody;
}
function parseQuery(query) {
  var reg = /\d+(?=\D*$)/;

  var id = query.match(reg);
  return parseInt(id);
}
