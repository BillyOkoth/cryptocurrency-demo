module.exports = {
    presets:["@babel/preset-env",["@babel/preset-react",{runtime:"automatic"}]],

    ///automatically imports the jsx functions that are going to be transpiled.
    "plugins": [
        [
          "@babel/plugin-transform-runtime",
          {
            "absoluteRuntime": false,
            "corejs": false,
            "helpers": true,
            "regenerator": true,
            "version": "^7.13.17"
          }
        ]
      ]
      //the pluggin allows to cater for async function . installation ^7.13.17 plugin transform runtime.

}