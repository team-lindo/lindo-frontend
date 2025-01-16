"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./reducers/user.js":
/*!**************************!*\
  !*** ./reducers/user.js ***!
  \**************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   logIn: function() { return /* binding */ logIn; },\n/* harmony export */   logOut: function() { return /* binding */ logOut; },\n/* harmony export */   setLogOutLoading: function() { return /* binding */ setLogOutLoading; }\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs\");\n\nconst initialState = {\n    isLoggedIn: false,\n    logInLoading: false,\n    logOutLoading: false,\n    me: null,\n    signUpData: {},\n    loginData: {}\n};\nconst userSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({\n    name: \"user\",\n    initialState,\n    reducers: {\n        logIn (state, action) {\n            state.isLoggedIn = true;\n            state.me = action.payload; // 로그인을 통해 me 상태 업데이트\n        },\n        logOut (state) {\n            state.isLoggedIn = false;\n            state.me = null; // 사용자 데이터 초기화\n            state.logOutLoading = false;\n        },\n        setLogOutLoading (state, action) {\n            state.logOutLoading = action.payload;\n        }\n    }\n});\nconst { logIn, logOut, setLogOutLoading } = userSlice.actions;\n/* harmony default export */ __webpack_exports__[\"default\"] = (userSlice.reducer);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWR1Y2Vycy91c2VyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBK0M7QUFFL0MsTUFBTUMsZUFBZTtJQUNuQkMsWUFBWTtJQUNaQyxjQUFjO0lBQ2RDLGVBQWU7SUFDZkMsSUFBSTtJQUNKQyxZQUFZLENBQUM7SUFDYkMsV0FBVyxDQUFDO0FBQ2Q7QUFFQSxNQUFNQyxZQUFZUiw2REFBV0EsQ0FBQztJQUM1QlMsTUFBTTtJQUNOUjtJQUNBUyxVQUFVO1FBQ1JDLE9BQU1DLEtBQUssRUFBRUMsTUFBTTtZQUNqQkQsTUFBTVYsVUFBVSxHQUFHO1lBQ25CVSxNQUFNUCxFQUFFLEdBQUdRLE9BQU9DLE9BQU8sRUFBRSxxQkFBcUI7UUFDbEQ7UUFDQUMsUUFBT0gsS0FBSztZQUNWQSxNQUFNVixVQUFVLEdBQUc7WUFDbkJVLE1BQU1QLEVBQUUsR0FBRyxNQUFNLGNBQWM7WUFDL0JPLE1BQU1SLGFBQWEsR0FBRztRQUN4QjtRQUNBWSxrQkFBaUJKLEtBQUssRUFBRUMsTUFBTTtZQUM1QkQsTUFBTVIsYUFBYSxHQUFHUyxPQUFPQyxPQUFPO1FBQ3RDO0lBQ0Y7QUFDRjtBQUVPLE1BQU0sRUFBRUgsS0FBSyxFQUFFSSxNQUFNLEVBQUVDLGdCQUFnQixFQUFFLEdBQUdSLFVBQVVTLE9BQU8sQ0FBQztBQUVyRSwrREFBZVQsVUFBVVUsT0FBTyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3JlZHVjZXJzL3VzZXIuanM/MGRmNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVTbGljZSB9IGZyb20gJ0ByZWR1eGpzL3Rvb2xraXQnO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gIGlzTG9nZ2VkSW46IGZhbHNlLFxyXG4gIGxvZ0luTG9hZGluZzogZmFsc2UsXHJcbiAgbG9nT3V0TG9hZGluZzogZmFsc2UsXHJcbiAgbWU6IG51bGwsIC8vIOy0iOq4sOqwkuydhCBudWxs66GcIOyEpOyglVxyXG4gIHNpZ25VcERhdGE6IHt9LFxyXG4gIGxvZ2luRGF0YToge30sXHJcbn07XHJcblxyXG5jb25zdCB1c2VyU2xpY2UgPSBjcmVhdGVTbGljZSh7XHJcbiAgbmFtZTogJ3VzZXInLFxyXG4gIGluaXRpYWxTdGF0ZSxcclxuICByZWR1Y2Vyczoge1xyXG4gICAgbG9nSW4oc3RhdGUsIGFjdGlvbikge1xyXG4gICAgICBzdGF0ZS5pc0xvZ2dlZEluID0gdHJ1ZTtcclxuICAgICAgc3RhdGUubWUgPSBhY3Rpb24ucGF5bG9hZDsgLy8g66Gc6re47J247J2EIO2Gte2VtCBtZSDsg4Htg5wg7JeF642w7J207Yq4XHJcbiAgICB9LFxyXG4gICAgbG9nT3V0KHN0YXRlKSB7XHJcbiAgICAgIHN0YXRlLmlzTG9nZ2VkSW4gPSBmYWxzZTtcclxuICAgICAgc3RhdGUubWUgPSBudWxsOyAvLyDsgqzsmqnsnpAg642w7J207YSwIOy0iOq4sO2ZlFxyXG4gICAgICBzdGF0ZS5sb2dPdXRMb2FkaW5nID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgc2V0TG9nT3V0TG9hZGluZyhzdGF0ZSwgYWN0aW9uKSB7XHJcbiAgICAgIHN0YXRlLmxvZ091dExvYWRpbmcgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgeyBsb2dJbiwgbG9nT3V0LCBzZXRMb2dPdXRMb2FkaW5nIH0gPSB1c2VyU2xpY2UuYWN0aW9ucztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJTbGljZS5yZWR1Y2VyO1xyXG5cclxuIl0sIm5hbWVzIjpbImNyZWF0ZVNsaWNlIiwiaW5pdGlhbFN0YXRlIiwiaXNMb2dnZWRJbiIsImxvZ0luTG9hZGluZyIsImxvZ091dExvYWRpbmciLCJtZSIsInNpZ25VcERhdGEiLCJsb2dpbkRhdGEiLCJ1c2VyU2xpY2UiLCJuYW1lIiwicmVkdWNlcnMiLCJsb2dJbiIsInN0YXRlIiwiYWN0aW9uIiwicGF5bG9hZCIsImxvZ091dCIsInNldExvZ091dExvYWRpbmciLCJhY3Rpb25zIiwicmVkdWNlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./reducers/user.js\n"));

/***/ })

});