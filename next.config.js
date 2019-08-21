const withCSS = require("@zeit/next-css");
/* Without CSS Modules, with PostCSS */
// module.exports = withCSS();

/* With CSS Modules */
// module.exports = withCSS({
//   cssModules: false,
//   useFileSystemPublicRoutes: false
// });
module.exports = withCSS({
  webpack: function(cfg) {
    const originalEntry = cfg.entry;
    cfg.entry = async () => {
      const entries = await originalEntry();
      if (
        entries["main.js"] &&
        !entries["main.js"].includes("./polyfills/polyfills.js")
      ) {
        entries["main.js"].unshift("./polyfills/polyfills.js");
      }

      return entries;
    };

    return cfg;
  },
  cssModules: false,
  useFileSystemPublicRoutes: false
});
