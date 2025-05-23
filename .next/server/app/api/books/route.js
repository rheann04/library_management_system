/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/books/route";
exports.ids = ["app/api/books/route"];
exports.modules = {

/***/ "(rsc)/./app/api/books/route.js":
/*!********************************!*\
  !*** ./app/api/books/route.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var mysql2_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mysql2/promise */ \"(rsc)/./node_modules/mysql2/promise.js\");\n\n\nconst dbConfig = {\n    host: 'localhost',\n    user: 'root',\n    password: '',\n    database: 'library_management'\n};\nasync function POST(request) {\n    const data = await request.json();\n    const connection = await mysql2_promise__WEBPACK_IMPORTED_MODULE_1__.createConnection(dbConfig);\n    try {\n        const [result] = await connection.execute(`INSERT INTO books (title, author, isbn, status, description, published_year, publisher, total_copies, available_copies)\n       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [\n            data.title,\n            data.author,\n            data.isbn,\n            data.status,\n            data.description,\n            data.publishedYear,\n            data.publisher,\n            data.copies,\n            data.copies\n        ]);\n        await connection.end();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            id: result.insertId\n        });\n    } catch (error) {\n        await connection.end();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\nasync function PUT(request) {\n    const data = await request.json();\n    const connection = await mysql2_promise__WEBPACK_IMPORTED_MODULE_1__.createConnection(dbConfig);\n    try {\n        const [result] = await connection.execute(`UPDATE books SET title=?, author=?, isbn=?, status=?, description=?, published_year=?, publisher=?, total_copies=?, available_copies=?\n       WHERE id=?`, [\n            data.title,\n            data.author,\n            data.isbn,\n            data.status,\n            data.description,\n            data.publishedYear,\n            data.publisher,\n            data.copies,\n            data.copies,\n            data.id\n        ]);\n        await connection.end();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        await connection.end();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\nasync function DELETE(request) {\n    const { id } = await request.json();\n    const connection = await mysql2_promise__WEBPACK_IMPORTED_MODULE_1__.createConnection(dbConfig);\n    try {\n        await connection.execute(`DELETE FROM books WHERE id=?`, [\n            id\n        ]);\n        await connection.end();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        await connection.end();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2Jvb2tzL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQTJDO0FBQ1I7QUFFbkMsTUFBTUUsV0FBVztJQUNmQyxNQUFNO0lBQ05DLE1BQU07SUFDTkMsVUFBVTtJQUNWQyxVQUFVO0FBQ1o7QUFFTyxlQUFlQyxLQUFLQyxPQUFPO0lBQ2hDLE1BQU1DLE9BQU8sTUFBTUQsUUFBUUUsSUFBSTtJQUMvQixNQUFNQyxhQUFhLE1BQU1WLDREQUFzQixDQUFDQztJQUVoRCxJQUFJO1FBQ0YsTUFBTSxDQUFDVyxPQUFPLEdBQUcsTUFBTUYsV0FBV0csT0FBTyxDQUN2QyxDQUFDO3lDQUNrQyxDQUFDLEVBQ3BDO1lBQ0VMLEtBQUtNLEtBQUs7WUFDVk4sS0FBS08sTUFBTTtZQUNYUCxLQUFLUSxJQUFJO1lBQ1RSLEtBQUtTLE1BQU07WUFDWFQsS0FBS1UsV0FBVztZQUNoQlYsS0FBS1csYUFBYTtZQUNsQlgsS0FBS1ksU0FBUztZQUNkWixLQUFLYSxNQUFNO1lBQ1hiLEtBQUthLE1BQU07U0FDWjtRQUVILE1BQU1YLFdBQVdZLEdBQUc7UUFDcEIsT0FBT3ZCLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRWMsU0FBUztZQUFNQyxJQUFJWixPQUFPYSxRQUFRO1FBQUM7SUFDaEUsRUFBRSxPQUFPQyxPQUFPO1FBQ2QsTUFBTWhCLFdBQVdZLEdBQUc7UUFDcEIsT0FBT3ZCLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRWMsU0FBUztZQUFPRyxPQUFPQSxNQUFNQyxPQUFPO1FBQUMsR0FBRztZQUFFVixRQUFRO1FBQUk7SUFDbkY7QUFDRjtBQUVPLGVBQWVXLElBQUlyQixPQUFPO0lBQy9CLE1BQU1DLE9BQU8sTUFBTUQsUUFBUUUsSUFBSTtJQUMvQixNQUFNQyxhQUFhLE1BQU1WLDREQUFzQixDQUFDQztJQUVoRCxJQUFJO1FBQ0YsTUFBTSxDQUFDVyxPQUFPLEdBQUcsTUFBTUYsV0FBV0csT0FBTyxDQUN2QyxDQUFDO2lCQUNVLENBQUMsRUFDWjtZQUNFTCxLQUFLTSxLQUFLO1lBQ1ZOLEtBQUtPLE1BQU07WUFDWFAsS0FBS1EsSUFBSTtZQUNUUixLQUFLUyxNQUFNO1lBQ1hULEtBQUtVLFdBQVc7WUFDaEJWLEtBQUtXLGFBQWE7WUFDbEJYLEtBQUtZLFNBQVM7WUFDZFosS0FBS2EsTUFBTTtZQUNYYixLQUFLYSxNQUFNO1lBQ1hiLEtBQUtnQixFQUFFO1NBQ1I7UUFFSCxNQUFNZCxXQUFXWSxHQUFHO1FBQ3BCLE9BQU92QixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQUVjLFNBQVM7UUFBSztJQUMzQyxFQUFFLE9BQU9HLE9BQU87UUFDZCxNQUFNaEIsV0FBV1ksR0FBRztRQUNwQixPQUFPdkIscURBQVlBLENBQUNVLElBQUksQ0FBQztZQUFFYyxTQUFTO1lBQU9HLE9BQU9BLE1BQU1DLE9BQU87UUFBQyxHQUFHO1lBQUVWLFFBQVE7UUFBSTtJQUNuRjtBQUNGO0FBRU8sZUFBZVksT0FBT3RCLE9BQU87SUFDbEMsTUFBTSxFQUFFaUIsRUFBRSxFQUFFLEdBQUcsTUFBTWpCLFFBQVFFLElBQUk7SUFDakMsTUFBTUMsYUFBYSxNQUFNViw0REFBc0IsQ0FBQ0M7SUFFaEQsSUFBSTtRQUNGLE1BQU1TLFdBQVdHLE9BQU8sQ0FBQyxDQUFDLDRCQUE0QixDQUFDLEVBQUU7WUFBQ1c7U0FBRztRQUM3RCxNQUFNZCxXQUFXWSxHQUFHO1FBQ3BCLE9BQU92QixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQUVjLFNBQVM7UUFBSztJQUMzQyxFQUFFLE9BQU9HLE9BQU87UUFDZCxNQUFNaEIsV0FBV1ksR0FBRztRQUNwQixPQUFPdkIscURBQVlBLENBQUNVLElBQUksQ0FBQztZQUFFYyxTQUFTO1lBQU9HLE9BQU9BLE1BQU1DLE9BQU87UUFBQyxHQUFHO1lBQUVWLFFBQVE7UUFBSTtJQUNuRjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGFzdXNcXERvY3VtZW50c1xcbGlicmFyeV9tYW5hZ2VtZW50X3N5c3RlbVxcbGlicmFyeS1mcm9udGVuZFxcYXBwXFxhcGlcXGJvb2tzXFxyb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcbmltcG9ydCBteXNxbCBmcm9tICdteXNxbDIvcHJvbWlzZSc7XHJcblxyXG5jb25zdCBkYkNvbmZpZyA9IHtcclxuICBob3N0OiAnbG9jYWxob3N0JyxcclxuICB1c2VyOiAncm9vdCcsIC8vIDwtLSBTZXQgeW91ciBNeVNRTCB1c2VybmFtZVxyXG4gIHBhc3N3b3JkOiAnJywgLy8gPC0tIFNldCB5b3VyIE15U1FMIHBhc3N3b3JkXHJcbiAgZGF0YWJhc2U6ICdsaWJyYXJ5X21hbmFnZW1lbnQnXHJcbn07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0KSB7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG4gIGNvbnN0IGNvbm5lY3Rpb24gPSBhd2FpdCBteXNxbC5jcmVhdGVDb25uZWN0aW9uKGRiQ29uZmlnKTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IFtyZXN1bHRdID0gYXdhaXQgY29ubmVjdGlvbi5leGVjdXRlKFxyXG4gICAgICBgSU5TRVJUIElOVE8gYm9va3MgKHRpdGxlLCBhdXRob3IsIGlzYm4sIHN0YXR1cywgZGVzY3JpcHRpb24sIHB1Ymxpc2hlZF95ZWFyLCBwdWJsaXNoZXIsIHRvdGFsX2NvcGllcywgYXZhaWxhYmxlX2NvcGllcylcclxuICAgICAgIFZBTFVFUyAoPywgPywgPywgPywgPywgPywgPywgPywgPylgLFxyXG4gICAgICBbXHJcbiAgICAgICAgZGF0YS50aXRsZSxcclxuICAgICAgICBkYXRhLmF1dGhvcixcclxuICAgICAgICBkYXRhLmlzYm4sXHJcbiAgICAgICAgZGF0YS5zdGF0dXMsXHJcbiAgICAgICAgZGF0YS5kZXNjcmlwdGlvbixcclxuICAgICAgICBkYXRhLnB1Ymxpc2hlZFllYXIsXHJcbiAgICAgICAgZGF0YS5wdWJsaXNoZXIsXHJcbiAgICAgICAgZGF0YS5jb3BpZXMsXHJcbiAgICAgICAgZGF0YS5jb3BpZXNcclxuICAgICAgXVxyXG4gICAgKTtcclxuICAgIGF3YWl0IGNvbm5lY3Rpb24uZW5kKCk7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBpZDogcmVzdWx0Lmluc2VydElkIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBhd2FpdCBjb25uZWN0aW9uLmVuZCgpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnJvci5tZXNzYWdlIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUFVUKHJlcXVlc3QpIHtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XHJcbiAgY29uc3QgY29ubmVjdGlvbiA9IGF3YWl0IG15c3FsLmNyZWF0ZUNvbm5lY3Rpb24oZGJDb25maWcpO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgW3Jlc3VsdF0gPSBhd2FpdCBjb25uZWN0aW9uLmV4ZWN1dGUoXHJcbiAgICAgIGBVUERBVEUgYm9va3MgU0VUIHRpdGxlPT8sIGF1dGhvcj0/LCBpc2JuPT8sIHN0YXR1cz0/LCBkZXNjcmlwdGlvbj0/LCBwdWJsaXNoZWRfeWVhcj0/LCBwdWJsaXNoZXI9PywgdG90YWxfY29waWVzPT8sIGF2YWlsYWJsZV9jb3BpZXM9P1xyXG4gICAgICAgV0hFUkUgaWQ9P2AsXHJcbiAgICAgIFtcclxuICAgICAgICBkYXRhLnRpdGxlLFxyXG4gICAgICAgIGRhdGEuYXV0aG9yLFxyXG4gICAgICAgIGRhdGEuaXNibixcclxuICAgICAgICBkYXRhLnN0YXR1cyxcclxuICAgICAgICBkYXRhLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgIGRhdGEucHVibGlzaGVkWWVhcixcclxuICAgICAgICBkYXRhLnB1Ymxpc2hlcixcclxuICAgICAgICBkYXRhLmNvcGllcyxcclxuICAgICAgICBkYXRhLmNvcGllcyxcclxuICAgICAgICBkYXRhLmlkXHJcbiAgICAgIF1cclxuICAgICk7XHJcbiAgICBhd2FpdCBjb25uZWN0aW9uLmVuZCgpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgYXdhaXQgY29ubmVjdGlvbi5lbmQoKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIERFTEVURShyZXF1ZXN0KSB7XHJcbiAgY29uc3QgeyBpZCB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XHJcbiAgY29uc3QgY29ubmVjdGlvbiA9IGF3YWl0IG15c3FsLmNyZWF0ZUNvbm5lY3Rpb24oZGJDb25maWcpO1xyXG5cclxuICB0cnkge1xyXG4gICAgYXdhaXQgY29ubmVjdGlvbi5leGVjdXRlKGBERUxFVEUgRlJPTSBib29rcyBXSEVSRSBpZD0/YCwgW2lkXSk7XHJcbiAgICBhd2FpdCBjb25uZWN0aW9uLmVuZCgpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgYXdhaXQgY29ubmVjdGlvbi5lbmQoKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwibXlzcWwiLCJkYkNvbmZpZyIsImhvc3QiLCJ1c2VyIiwicGFzc3dvcmQiLCJkYXRhYmFzZSIsIlBPU1QiLCJyZXF1ZXN0IiwiZGF0YSIsImpzb24iLCJjb25uZWN0aW9uIiwiY3JlYXRlQ29ubmVjdGlvbiIsInJlc3VsdCIsImV4ZWN1dGUiLCJ0aXRsZSIsImF1dGhvciIsImlzYm4iLCJzdGF0dXMiLCJkZXNjcmlwdGlvbiIsInB1Ymxpc2hlZFllYXIiLCJwdWJsaXNoZXIiLCJjb3BpZXMiLCJlbmQiLCJzdWNjZXNzIiwiaWQiLCJpbnNlcnRJZCIsImVycm9yIiwibWVzc2FnZSIsIlBVVCIsIkRFTEVURSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/books/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/mysql2/lib sync recursive ^cardinal.*$":
/*!****************************************************!*\
  !*** ./node_modules/mysql2/lib/ sync ^cardinal.*$ ***!
  \****************************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(rsc)/./node_modules/mysql2/lib sync recursive ^cardinal.*$";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbooks%2Froute&page=%2Fapi%2Fbooks%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbooks%2Froute.js&appDir=C%3A%5CUsers%5Casus%5CDocuments%5Clibrary_management_system%5Clibrary-frontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Casus%5CDocuments%5Clibrary_management_system%5Clibrary-frontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbooks%2Froute&page=%2Fapi%2Fbooks%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbooks%2Froute.js&appDir=C%3A%5CUsers%5Casus%5CDocuments%5Clibrary_management_system%5Clibrary-frontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Casus%5CDocuments%5Clibrary_management_system%5Clibrary-frontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_asus_Documents_library_management_system_library_frontend_app_api_books_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/books/route.js */ \"(rsc)/./app/api/books/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/books/route\",\n        pathname: \"/api/books\",\n        filename: \"route\",\n        bundlePath: \"app/api/books/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\asus\\\\Documents\\\\library_management_system\\\\library-frontend\\\\app\\\\api\\\\books\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_asus_Documents_library_management_system_library_frontend_app_api_books_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZib29rcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYm9va3MlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZib29rcyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhc3VzJTVDRG9jdW1lbnRzJTVDbGlicmFyeV9tYW5hZ2VtZW50X3N5c3RlbSU1Q2xpYnJhcnktZnJvbnRlbmQlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2FzdXMlNUNEb2N1bWVudHMlNUNsaWJyYXJ5X21hbmFnZW1lbnRfc3lzdGVtJTVDbGlicmFyeS1mcm9udGVuZCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDa0Q7QUFDL0g7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGFzdXNcXFxcRG9jdW1lbnRzXFxcXGxpYnJhcnlfbWFuYWdlbWVudF9zeXN0ZW1cXFxcbGlicmFyeS1mcm9udGVuZFxcXFxhcHBcXFxcYXBpXFxcXGJvb2tzXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9ib29rcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2Jvb2tzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9ib29rcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGFzdXNcXFxcRG9jdW1lbnRzXFxcXGxpYnJhcnlfbWFuYWdlbWVudF9zeXN0ZW1cXFxcbGlicmFyeS1mcm9udGVuZFxcXFxhcHBcXFxcYXBpXFxcXGJvb2tzXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbooks%2Froute&page=%2Fapi%2Fbooks%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbooks%2Froute.js&appDir=C%3A%5CUsers%5Casus%5CDocuments%5Clibrary_management_system%5Clibrary-frontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Casus%5CDocuments%5Clibrary_management_system%5Clibrary-frontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ "timers":
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mysql2","vendor-chunks/iconv-lite","vendor-chunks/aws-ssl-profiles","vendor-chunks/sqlstring","vendor-chunks/seq-queue","vendor-chunks/lru-cache","vendor-chunks/long","vendor-chunks/safer-buffer","vendor-chunks/named-placeholders","vendor-chunks/lru.min","vendor-chunks/is-property","vendor-chunks/generate-function","vendor-chunks/denque"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbooks%2Froute&page=%2Fapi%2Fbooks%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbooks%2Froute.js&appDir=C%3A%5CUsers%5Casus%5CDocuments%5Clibrary_management_system%5Clibrary-frontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Casus%5CDocuments%5Clibrary_management_system%5Clibrary-frontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();