import App, { Container } from "next/app";
import React from "react";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";
import {
  mapStores,
  mapBrandsRaw,
  mapCategory,
  mapBreadcrumbs,
  mapSizes,
  mapColors
} from "../helpers/";
class EverlastApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // we can dispatch from here too

    if (Object.keys(ctx.reduxStore.getState().catalog).length == 0) {
      try {
        const getSiteCategoryResponce = await fetch(
          "https://everlast.scud.com.ua/api/",
          {
            method: "post",
            mode: "cors",
            responce_type: "json",
            site: "1",
            headers: new Headers({
              "Content-Type":
                "application/x-www-form-urlencoded; charset=utf-8",
              Accept:
                "application/json, application/xml, text/plain, text/html, *.*"
            }),
            body: "action=getSiteCategory&responce_type=json&site=1"
          }
        );
        const getSiteCategoryJson = await getSiteCategoryResponce.json();

        const getSizeResponce = await fetch(
          "https://everlast.scud.com.ua/api/",
          {
            method: "post",
            mode: "cors",
            responce_type: "json",
            site: "1",
            headers: new Headers({
              "Content-Type":
                "application/x-www-form-urlencoded; charset=utf-8",
              Accept:
                "application/json, application/xml, text/plain, text/html, *.*"
            }),
            body: "action=getSize&responce_type=json&site=1"
          }
        );
        const getSizeJson = await getSizeResponce.json();

        const getBrandResponce = await fetch(
          "https://everlast.scud.com.ua/api/",
          {
            method: "post",
            mode: "cors",
            responce_type: "json",
            site: "1",
            headers: new Headers({
              "Content-Type":
                "application/x-www-form-urlencoded; charset=utf-8",
              Accept:
                "application/json, application/xml, text/plain, text/html, *.*"
            }),
            body: "action=getBrand&responce_type=json&site=1"
          }
        );
        const getBrandJson = await getBrandResponce.json();

        const getStoresResponce = await fetch(
          "https://everlast.scud.com.ua/api/",
          {
            method: "post",
            mode: "cors",
            responce_type: "json",
            site: "1",
            headers: new Headers({
              "Content-Type":
                "application/x-www-form-urlencoded; charset=utf-8",
              Accept:
                "application/json, application/xml, text/plain, text/html, *.*"
            }),
            body: "action=getStores&responce_type=json&site=1"
          }
        );
        const getStoresJson = await getStoresResponce.json();

        const getColorResponce = await fetch(
          "https://everlast.scud.com.ua/api/",
          {
            method: "post",
            mode: "cors",
            responce_type: "json",
            site: "1",
            headers: new Headers({
              "Content-Type":
                "application/x-www-form-urlencoded; charset=utf-8",
              Accept:
                "application/json, application/xml, text/plain, text/html, *.*"
            }),
            body: "action=getColor&responce_type=json&site=1"
          }
        );
        const getColorJson = await getColorResponce.json();
        // GET MIN AND MAX PRICE
        const getMinAndMAxPrice = await fetch(
          "https://everlast.scud.com.ua/api/",
          {
            method: "post",
            mode: "cors",
            responce_type: "json",
            site: "1",
            headers: new Headers({
              "Content-Type":
                "application/x-www-form-urlencoded; charset=utf-8",
              Accept:
                "application/json, application/xml, text/plain, text/html, *.*"
            }),
            body: "action=getGoodsInSite&responce_type=json&site=1&limit=1"
          }
        );
        const getPrice = await getMinAndMAxPrice.json();
        const minMaxPrice = getPrice.result.search.price;
        // get vringe ads
        let vringeFetch;
        let vringeJson;
        try {
          vringeFetch = await fetch("https://vringe.com/export/everlast/", {
            method: "get",
            mode: "cors",
            headers: new Headers({
              "Content-Type":
                "application/x-www-form-urlencoded; charset=utf-8",
              Accept:
                "application/json, application/xml, text/plain, text/html, *.*"
            })
          });
          vringeJson = await vringeFetch.json();
        } catch (error) {
          console.log(error);
        }

        //MAP
        const storesMapped = mapStores(getStoresJson.result);
        const brendMapped = mapBrandsRaw(getBrandJson.result);
        const categoryMapped = mapCategory(getSiteCategoryJson.result);
        const breadcrumbsMapped = mapBreadcrumbs(getSiteCategoryJson.result);
        const sizesMapped = mapSizes(getSizeJson.result);
        const colorsMapped = mapColors(getColorJson.result);
        const data = {
          sizes: sizesMapped,
          siteCategory: categoryMapped,
          colors: colorsMapped,
          brands: brendMapped,
          brand: getPrice.result.search.brand,
          stores: storesMapped,
          breadcrumbs: breadcrumbsMapped,
          price: minMaxPrice,
          filterData: { ...getPrice.result.search },
          vringe: vringeJson
        };
        ctx.reduxStore.dispatch({ type: "INITIAL_DATA", payload: data });
      } catch (error) {
        console.log(error);
      }
    }
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(EverlastApp);
