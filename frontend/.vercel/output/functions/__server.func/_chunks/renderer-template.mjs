import { r as HTTPResponse } from "../_libs/h3+rou3+srvx.mjs";
//#region #nitro/virtual/renderer-template
var rendererTemplate = () => new HTTPResponse("<!doctype html>\n<html lang=\"es\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"https://pub-45ac6957fba64f04a0f8a0fd40292c60.r2.dev/productos/dvEcf0VxtjxaHq3yAHBw9uQr4CW4keFw3GFAUvqa.jpg\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>TechUniverse - Tienda de Tecnología</title>\n  </head>\n  <body class=\"bg-gray-50 text-gray-900 antialiased\">\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.tsx\"><\/script>\n  </body>\n</html>\n", { headers: { "content-type": "text/html; charset=utf-8" } });
//#endregion
//#region node_modules/nitro/dist/runtime/internal/routes/renderer-template.mjs
function renderIndexHTML(event) {
	return rendererTemplate(event.req);
}
//#endregion
export { renderIndexHTML as default };
