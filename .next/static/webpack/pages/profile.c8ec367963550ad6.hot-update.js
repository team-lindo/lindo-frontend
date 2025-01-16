"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/profile",{

/***/ "./components/UserProfile.js":
/*!***********************************!*\
  !*** ./components/UserProfile.js ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var antd_lib_avatar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd/lib/avatar */ \"./node_modules/antd/lib/avatar/index.js\");\n/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd/lib/button */ \"./node_modules/antd/lib/button/index.js\");\n/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var antd_lib_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd/lib/card */ \"./node_modules/antd/lib/card/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/dist/react-redux.mjs\");\n/* harmony import */ var _reducers_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers/user */ \"./reducers/user.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n // 정확히 logOut을 import\nconst UserProfile = ()=>{\n    var _me_nickname;\n    _s();\n    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();\n    const { me, logOutLoading } = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.user);\n    console.log(me);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        dispatch(logIn({\n            nickname: \"test\",\n            email: \"test@example.com\"\n        }));\n    }, [\n        dispatch\n    ]);\n    // 로그아웃 핸들러\n    const onLogOut = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{\n        dispatch((0,_reducers_user__WEBPACK_IMPORTED_MODULE_2__.logOut)()); // logOut 호출\n    }, [\n        dispatch\n    ]);\n    // 스타일 객체를 useMemo로 메모이제이션\n    const styles = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({\n            cardContainer: {\n                marginTop: \"16px\"\n            },\n            button: {\n                marginTop: \"16px\"\n            },\n            avatar: {\n                backgroundColor: \"#87d068\"\n            }\n        }), []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd_lib_card__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n        style: styles.cardContainer,\n        actions: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    \"게시물 \",\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, void 0, void 0),\n                    \" 0 \"\n                ]\n            }, \"post\", true, void 0, void 0),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    \"팔로워 \",\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, void 0, void 0),\n                    \" 0 \"\n                ]\n            }, \"follower\", true, void 0, void 0),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    \"팔로잉 \",\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, void 0, void 0),\n                    \" 0 \"\n                ]\n            }, \"following\", true, void 0, void 0)\n        ],\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd_lib_card__WEBPACK_IMPORTED_MODULE_4__[\"default\"].Meta, {\n                avatar: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(antd_lib_avatar__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                    style: styles.avatar,\n                    children: (me === null || me === void 0 ? void 0 : (_me_nickname = me.nickname) === null || _me_nickname === void 0 ? void 0 : _me_nickname[0]) || \"?\"\n                }, void 0, false, void 0, void 0),\n                title: (me === null || me === void 0 ? void 0 : me.nickname) || \"Guest\",\n                description: \"방가 방가\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\SAMSUNG\\\\Desktop\\\\codire\\\\prepare\\\\front\\\\components\\\\UserProfile.js\",\n                lineNumber: 44,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((antd_lib_button__WEBPACK_IMPORTED_MODULE_6___default()), {\n                onClick: onLogOut,\n                type: \"primary\",\n                loading: logOutLoading,\n                style: styles.button,\n                children: \"로그아웃\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\SAMSUNG\\\\Desktop\\\\codire\\\\prepare\\\\front\\\\components\\\\UserProfile.js\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\SAMSUNG\\\\Desktop\\\\codire\\\\prepare\\\\front\\\\components\\\\UserProfile.js\",\n        lineNumber: 36,\n        columnNumber: 5\n    }, undefined);\n};\n_s(UserProfile, \"UeGKu/LSEfyfWlybnUVyAc5h4fk=\", false, function() {\n    return [\n        react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch,\n        react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector\n    ];\n});\n_c = UserProfile;\n/* harmony default export */ __webpack_exports__[\"default\"] = (UserProfile); /*\r\nimport { Avatar, Button, Card } from \"antd\";\r\nimport { useCallback, useMemo } from \"react\";\r\nimport { useDispatch, useSelector } from 'react-redux';\r\n\r\nimport { logOut } from '../reducers/user';\r\n\r\nconst UserProfile = () => {\r\n  const dispatch = useDispatch();\r\n  const { me, logOutLoading } = useSelector((state) => state.user);\r\n\r\n  // 로그아웃 핸들러\r\n  const onLogOut = useCallback(() => {\r\n    dispatch(logOut()); // logOut 사용\r\n  }, [dispatch]);\r\n  // 스타일 객체를 useMemo로 메모이제이션\r\n  const styles = useMemo(\r\n    () => ({\r\n      cardContainer: { marginTop: \"16px\" }, // Card의 margin-top 스타일\r\n      button: { marginTop: \"16px\" }, // Button의 margin-top 스타일\r\n      avatar: { backgroundColor: \"#87d068\" }, // Avatar 스타일\r\n    }),\r\n    []\r\n  );\r\n\r\n  return (\r\n    <Card\r\n      style={styles.cardContainer} // Card의 스타일 적용\r\n      actions={[\r\n        <div key=\"post\">게시물 <br /> 0 </div>,\r\n        <div key=\"follower\">팔로워 <br /> 0 </div>,\r\n        <div key=\"following\">팔로잉 <br /> 0 </div>,\r\n      ]}\r\n    >\r\n     \r\n      <Card.Meta\r\n        avatar={<Avatar style={styles.avatar}>{'N'}</Avatar>} // Avatar 스타일 적용\r\n        title=\"Noopy\"\r\n        description=\"방가 방가\"\r\n      />\r\n\r\n     \r\n      <Button\r\n        onClick={onLogOut}\r\n        type=\"primary\"\r\n        style={styles.button} // Button 스타일 적용\r\n      >\r\n        로그아웃\r\n      </Button>\r\n    </Card>\r\n  );\r\n};\r\n\r\nexport default UserProfile;*/  /*\r\nimport { Avatar, Button, Card } from \"antd\";\r\nimport { useCallback, useMemo } from \"react\";\r\nimport Link from \"next/link\";\r\nimport FollowList from \"../pages/FollowList\";\r\nimport FollowingList from \"../pages/FollowList\";\r\n\r\nconst UserProfile = ({ setIsLogged }) => {\r\n  // 로그아웃 핸들러\r\n  const onLogOut = useCallback(() => {\r\n    setIsLogged(false);\r\n  }, [setIsLogged]); // 의존성 배열에 setIsLogged 추가\r\n\r\n  // 스타일 객체를 useMemo로 메모이제이션\r\n  const styles = useMemo(\r\n    () => ({\r\n      cardContainer: { marginTop: \"16px\" }, // Card의 margin-top 스타일\r\n      button: { marginTop: \"16px\" }, // Button의 margin-top 스타일\r\n      avatar: { backgroundColor: \"#87d068\" }, // Avatar 스타일\r\n      actionButton: { margin: \"0 8px\" }, // Actions 버튼 스타일\r\n    }),\r\n    []\r\n  );\r\n\r\n  return (\r\n    <Card\r\n      style={styles.cardContainer} // Card의 스타일 적용\r\n      actions={[\r\n        <Link href=\"/posts\" key=\"post\">\r\n          <Button type=\"link\" style={styles.actionButton}>\r\n            게시물\r\n          </Button>\r\n        </Link>,\r\n        <Link href=\"/FollowList\" key=\"follower\">\r\n          <Button type=\"link\" style={styles.actionButton}>\r\n            팔로워\r\n          </Button>\r\n        </Link>,\r\n        <Link href=\"/FollowingList\" key=\"following\">\r\n          <Button type=\"link\" style={styles.actionButton}>\r\n            팔로잉\r\n          </Button>\r\n        </Link>,\r\n      ]}\r\n    >\r\n     \r\n      <Card.Meta\r\n        avatar={<Avatar style={styles.avatar}>{'N'}</Avatar>} // Avatar 스타일 적용\r\n        title=\"Noopy\"\r\n        description=\"방가 방가\"\r\n      />\r\n\r\n      \r\n      <Button\r\n        onClick={onLogOut}\r\n        type=\"primary\"\r\n        style={styles.button} // Button 스타일 적용\r\n      >\r\n        로그아웃\r\n      </Button>\r\n    </Card>\r\n  );\r\n};\r\n\r\nexport default UserProfile;\r\n*/  /*import { Avatar, Button, Card } from \"antd\";\r\nimport { useCallback, useMemo } from \"react\";\r\n\r\nconst UserProfile = ({ setIsLogged }) => {\r\n  // 로그아웃 핸들러\r\n  const onLogOut = useCallback(() => {\r\n    setIsLogged(false);\r\n  }, [setIsLogged]); // 의존성 배열에 setIsLogged 추가\r\n\r\n  // 스타일 객체를 useMemo로 메모이제이션\r\n  const styles = useMemo(\r\n    () => ({\r\n      cardContainer: { marginTop: \"16px\" }, // Card의 margin-top 스타일\r\n      button: { marginTop: \"16px\" }, // Button의 margin-top 스타일\r\n      avatar: { backgroundColor: \"#87d068\" }, // Avatar 스타일\r\n    }),\r\n    []\r\n  );\r\n\r\n  return (\r\n    <Card\r\n      style={styles.cardContainer} // Card의 스타일 적용\r\n      actions={[\r\n        <div key=\"post\">게시물 <br /> 0 </div>,\r\n        <div key=\"follower\">팔로워 <br /> 0 </div>,\r\n        <div key=\"following\">팔로잉 <br /> 0 </div>,\r\n      ]}\r\n    >\r\n     \r\n      <Card.Meta\r\n        avatar={<Avatar style={styles.avatar}>{'N'}</Avatar>} // Avatar 스타일 적용\r\n        title=\"Noopy\"\r\n        description=\"방가 방가\"\r\n      />\r\n\r\n     \r\n      <Button\r\n        onClick={onLogOut}\r\n        type=\"primary\"\r\n        style={styles.button} // Button 스타일 적용\r\n      >\r\n        로그아웃\r\n      </Button>\r\n    </Card>\r\n  );\r\n};\r\n\r\nexport default UserProfile;\r\n*/ \nvar _c;\n$RefreshReg$(_c, \"UserProfile\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL1VzZXJQcm9maWxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBNEM7QUFBQTtBQUFBO0FBQ1k7QUFDRDtBQUViLENBQUMscUJBQXFCO0FBRWhFLE1BQU1TLGNBQWM7UUFzQzJCQzs7SUFyQzdDLE1BQU1DLFdBQVdMLHdEQUFXQTtJQUM1QixNQUFNLEVBQUVJLEVBQUUsRUFBRUUsYUFBYSxFQUFFLEdBQUdMLHdEQUFXQSxDQUFDLENBQUNNLFFBQVVBLE1BQU1DLElBQUk7SUFDL0RDLFFBQVFDLEdBQUcsQ0FBQ047SUFDWkwsZ0RBQVNBLENBQUM7UUFFUk0sU0FDRU0sTUFBTTtZQUNKQyxVQUFVO1lBQ1ZDLE9BQU87UUFDVDtJQUVKLEdBQUc7UUFBQ1I7S0FBUztJQUNiLFdBQVc7SUFDWCxNQUFNUyxXQUFXakIsa0RBQVdBLENBQUM7UUFDM0JRLFNBQVNILHNEQUFNQSxLQUFLLFlBQVk7SUFDbEMsR0FBRztRQUFDRztLQUFTO0lBRWIsMEJBQTBCO0lBQzFCLE1BQU1VLFNBQVNqQiw4Q0FBT0EsQ0FDcEIsSUFBTztZQUNMa0IsZUFBZTtnQkFBRUMsV0FBVztZQUFPO1lBQ25DQyxRQUFRO2dCQUFFRCxXQUFXO1lBQU87WUFDNUJFLFFBQVE7Z0JBQUVDLGlCQUFpQjtZQUFVO1FBQ3ZDLElBQ0EsRUFBRTtJQUdKLHFCQUNFLDhEQUFDeEIscURBQUlBO1FBQ0h5QixPQUFPTixPQUFPQyxhQUFhO1FBQzNCTSxTQUFTOzBCQUNQLDhEQUFDQzs7b0JBQWU7a0NBQUksOERBQUNDO29CQUFLOztlQUFqQjswQkFDVCw4REFBQ0Q7O29CQUFtQjtrQ0FBSSw4REFBQ0M7b0JBQUs7O2VBQXJCOzBCQUNULDhEQUFDRDs7b0JBQW9CO2tDQUFJLDhEQUFDQztvQkFBSzs7ZUFBdEI7U0FDVjs7MEJBRUQsOERBQUM1QiwwREFBUztnQkFDUnVCLHNCQUFRLDhEQUFDekIsdURBQU1BO29CQUFDMkIsT0FBT04sT0FBT0ksTUFBTTs4QkFBR2YsQ0FBQUEsZUFBQUEsMEJBQUFBLGVBQUFBLEdBQUlRLFFBQVEsY0FBWlIsbUNBQUFBLFlBQWMsQ0FBQyxFQUFFLEtBQUk7O2dCQUM1RHNCLE9BQU90QixDQUFBQSxlQUFBQSx5QkFBQUEsR0FBSVEsUUFBUSxLQUFJO2dCQUN2QmUsYUFBWTs7Ozs7OzBCQUVkLDhEQUFDaEMsd0RBQU1BO2dCQUNMaUMsU0FBU2Q7Z0JBQ1RlLE1BQUs7Z0JBQ0xDLFNBQVN4QjtnQkFDVGUsT0FBT04sT0FBT0csTUFBTTswQkFDckI7Ozs7Ozs7Ozs7OztBQUtQO0dBcERNZjs7UUFDYUgsb0RBQVdBO1FBQ0VDLG9EQUFXQTs7O0tBRnJDRTtBQXNETiwrREFBZUEsV0FBV0EsRUFBQyxDQUUzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJBcUQyQixJQUMzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpRUEsSUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0RBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvVXNlclByb2ZpbGUuanM/NzE1YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdmF0YXIsIEJ1dHRvbiwgQ2FyZCB9IGZyb20gXCJhbnRkXCI7XHJcbmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yIH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcblxyXG5pbXBvcnQgeyBsb2dPdXQgfSBmcm9tIFwiLi4vcmVkdWNlcnMvdXNlclwiOyAvLyDsoJXtmZXtnoggbG9nT3V07J2EIGltcG9ydFxyXG5cclxuY29uc3QgVXNlclByb2ZpbGUgPSAoKSA9PiB7XHJcbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xyXG4gIGNvbnN0IHsgbWUsIGxvZ091dExvYWRpbmcgfSA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUudXNlcik7XHJcbiAgY29uc29sZS5sb2cobWUpOyBcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG5cclxuICAgIGRpc3BhdGNoKFxyXG4gICAgICBsb2dJbih7XHJcbiAgICAgICAgbmlja25hbWU6IFwidGVzdFwiLFxyXG4gICAgICAgIGVtYWlsOiBcInRlc3RAZXhhbXBsZS5jb21cIixcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfSwgW2Rpc3BhdGNoXSk7XHJcbiAgLy8g66Gc6re47JWE7JuDIO2VuOuTpOufrFxyXG4gIGNvbnN0IG9uTG9nT3V0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgZGlzcGF0Y2gobG9nT3V0KCkpOyAvLyBsb2dPdXQg7Zi47LacXHJcbiAgfSwgW2Rpc3BhdGNoXSk7XHJcblxyXG4gIC8vIOyKpO2DgOydvCDqsJ3ssrTrpbwgdXNlTWVtb+uhnCDrqZTrqqjsnbTsoJzsnbTshZhcclxuICBjb25zdCBzdHlsZXMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgY2FyZENvbnRhaW5lcjogeyBtYXJnaW5Ub3A6IFwiMTZweFwiIH0sXHJcbiAgICAgIGJ1dHRvbjogeyBtYXJnaW5Ub3A6IFwiMTZweFwiIH0sXHJcbiAgICAgIGF2YXRhcjogeyBiYWNrZ3JvdW5kQ29sb3I6IFwiIzg3ZDA2OFwiIH0sXHJcbiAgICB9KSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxDYXJkXHJcbiAgICAgIHN0eWxlPXtzdHlsZXMuY2FyZENvbnRhaW5lcn1cclxuICAgICAgYWN0aW9ucz17W1xyXG4gICAgICAgIDxkaXYga2V5PVwicG9zdFwiPuqyjOyLnOusvCA8YnIgLz4gMCA8L2Rpdj4sXHJcbiAgICAgICAgPGRpdiBrZXk9XCJmb2xsb3dlclwiPu2MlOuhnOybjCA8YnIgLz4gMCA8L2Rpdj4sXHJcbiAgICAgICAgPGRpdiBrZXk9XCJmb2xsb3dpbmdcIj7tjJTroZzsnokgPGJyIC8+IDAgPC9kaXY+LFxyXG4gICAgICBdfVxyXG4gICAgPlxyXG4gICAgICA8Q2FyZC5NZXRhXHJcbiAgICAgICAgYXZhdGFyPXs8QXZhdGFyIHN0eWxlPXtzdHlsZXMuYXZhdGFyfT57bWU/Lm5pY2tuYW1lPy5bMF0gfHwgXCI/XCJ9PC9BdmF0YXI+fVxyXG4gICAgICAgIHRpdGxlPXttZT8ubmlja25hbWUgfHwgXCJHdWVzdFwifVxyXG4gICAgICAgIGRlc2NyaXB0aW9uPVwi67Cp6rCAIOuwqeqwgFwiXHJcbiAgICAgIC8+XHJcbiAgICAgIDxCdXR0b25cclxuICAgICAgICBvbkNsaWNrPXtvbkxvZ091dH1cclxuICAgICAgICB0eXBlPVwicHJpbWFyeVwiXHJcbiAgICAgICAgbG9hZGluZz17bG9nT3V0TG9hZGluZ31cclxuICAgICAgICBzdHlsZT17c3R5bGVzLmJ1dHRvbn1cclxuICAgICAgPlxyXG4gICAgICAgIOuhnOq3uOyVhOybg1xyXG4gICAgICA8L0J1dHRvbj5cclxuICAgIDwvQ2FyZD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXNlclByb2ZpbGU7XHJcblxyXG4vKlxyXG5pbXBvcnQgeyBBdmF0YXIsIEJ1dHRvbiwgQ2FyZCB9IGZyb20gXCJhbnRkXCI7XHJcbmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZURpc3BhdGNoLCB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuXHJcbmltcG9ydCB7IGxvZ091dCB9IGZyb20gJy4uL3JlZHVjZXJzL3VzZXInO1xyXG5cclxuY29uc3QgVXNlclByb2ZpbGUgPSAoKSA9PiB7XHJcbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xyXG4gIGNvbnN0IHsgbWUsIGxvZ091dExvYWRpbmcgfSA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUudXNlcik7XHJcblxyXG4gIC8vIOuhnOq3uOyVhOybgyDtlbjrk6Trn6xcclxuICBjb25zdCBvbkxvZ091dCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGRpc3BhdGNoKGxvZ091dCgpKTsgLy8gbG9nT3V0IOyCrOyaqVxyXG4gIH0sIFtkaXNwYXRjaF0pO1xyXG4gIC8vIOyKpO2DgOydvCDqsJ3ssrTrpbwgdXNlTWVtb+uhnCDrqZTrqqjsnbTsoJzsnbTshZhcclxuICBjb25zdCBzdHlsZXMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgY2FyZENvbnRhaW5lcjogeyBtYXJnaW5Ub3A6IFwiMTZweFwiIH0sIC8vIENhcmTsnZggbWFyZ2luLXRvcCDsiqTtg4DsnbxcclxuICAgICAgYnV0dG9uOiB7IG1hcmdpblRvcDogXCIxNnB4XCIgfSwgLy8gQnV0dG9u7J2YIG1hcmdpbi10b3Ag7Iqk7YOA7J28XHJcbiAgICAgIGF2YXRhcjogeyBiYWNrZ3JvdW5kQ29sb3I6IFwiIzg3ZDA2OFwiIH0sIC8vIEF2YXRhciDsiqTtg4DsnbxcclxuICAgIH0pLFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPENhcmRcclxuICAgICAgc3R5bGU9e3N0eWxlcy5jYXJkQ29udGFpbmVyfSAvLyBDYXJk7J2YIOyKpO2DgOydvCDsoIHsmqlcclxuICAgICAgYWN0aW9ucz17W1xyXG4gICAgICAgIDxkaXYga2V5PVwicG9zdFwiPuqyjOyLnOusvCA8YnIgLz4gMCA8L2Rpdj4sXHJcbiAgICAgICAgPGRpdiBrZXk9XCJmb2xsb3dlclwiPu2MlOuhnOybjCA8YnIgLz4gMCA8L2Rpdj4sXHJcbiAgICAgICAgPGRpdiBrZXk9XCJmb2xsb3dpbmdcIj7tjJTroZzsnokgPGJyIC8+IDAgPC9kaXY+LFxyXG4gICAgICBdfVxyXG4gICAgPlxyXG4gICAgIFxyXG4gICAgICA8Q2FyZC5NZXRhXHJcbiAgICAgICAgYXZhdGFyPXs8QXZhdGFyIHN0eWxlPXtzdHlsZXMuYXZhdGFyfT57J04nfTwvQXZhdGFyPn0gLy8gQXZhdGFyIOyKpO2DgOydvCDsoIHsmqlcclxuICAgICAgICB0aXRsZT1cIk5vb3B5XCJcclxuICAgICAgICBkZXNjcmlwdGlvbj1cIuuwqeqwgCDrsKnqsIBcIlxyXG4gICAgICAvPlxyXG5cclxuICAgICBcclxuICAgICAgPEJ1dHRvblxyXG4gICAgICAgIG9uQ2xpY2s9e29uTG9nT3V0fVxyXG4gICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcclxuICAgICAgICBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gLy8gQnV0dG9uIOyKpO2DgOydvCDsoIHsmqlcclxuICAgICAgPlxyXG4gICAgICAgIOuhnOq3uOyVhOybg1xyXG4gICAgICA8L0J1dHRvbj5cclxuICAgIDwvQ2FyZD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXNlclByb2ZpbGU7Ki9cclxuLypcclxuaW1wb3J0IHsgQXZhdGFyLCBCdXR0b24sIENhcmQgfSBmcm9tIFwiYW50ZFwiO1xyXG5pbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XHJcbmltcG9ydCBGb2xsb3dMaXN0IGZyb20gXCIuLi9wYWdlcy9Gb2xsb3dMaXN0XCI7XHJcbmltcG9ydCBGb2xsb3dpbmdMaXN0IGZyb20gXCIuLi9wYWdlcy9Gb2xsb3dMaXN0XCI7XHJcblxyXG5jb25zdCBVc2VyUHJvZmlsZSA9ICh7IHNldElzTG9nZ2VkIH0pID0+IHtcclxuICAvLyDroZzqt7jslYTsm4Mg7ZW465Ok65+sXHJcbiAgY29uc3Qgb25Mb2dPdXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRJc0xvZ2dlZChmYWxzZSk7XHJcbiAgfSwgW3NldElzTG9nZ2VkXSk7IC8vIOydmOyhtOyEsSDrsLDsl7Tsl5Agc2V0SXNMb2dnZWQg7LaU6rCAXHJcblxyXG4gIC8vIOyKpO2DgOydvCDqsJ3ssrTrpbwgdXNlTWVtb+uhnCDrqZTrqqjsnbTsoJzsnbTshZhcclxuICBjb25zdCBzdHlsZXMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgY2FyZENvbnRhaW5lcjogeyBtYXJnaW5Ub3A6IFwiMTZweFwiIH0sIC8vIENhcmTsnZggbWFyZ2luLXRvcCDsiqTtg4DsnbxcclxuICAgICAgYnV0dG9uOiB7IG1hcmdpblRvcDogXCIxNnB4XCIgfSwgLy8gQnV0dG9u7J2YIG1hcmdpbi10b3Ag7Iqk7YOA7J28XHJcbiAgICAgIGF2YXRhcjogeyBiYWNrZ3JvdW5kQ29sb3I6IFwiIzg3ZDA2OFwiIH0sIC8vIEF2YXRhciDsiqTtg4DsnbxcclxuICAgICAgYWN0aW9uQnV0dG9uOiB7IG1hcmdpbjogXCIwIDhweFwiIH0sIC8vIEFjdGlvbnMg67KE7Yq8IOyKpO2DgOydvFxyXG4gICAgfSksXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Q2FyZFxyXG4gICAgICBzdHlsZT17c3R5bGVzLmNhcmRDb250YWluZXJ9IC8vIENhcmTsnZgg7Iqk7YOA7J28IOyggeyaqVxyXG4gICAgICBhY3Rpb25zPXtbXHJcbiAgICAgICAgPExpbmsgaHJlZj1cIi9wb3N0c1wiIGtleT1cInBvc3RcIj5cclxuICAgICAgICAgIDxCdXR0b24gdHlwZT1cImxpbmtcIiBzdHlsZT17c3R5bGVzLmFjdGlvbkJ1dHRvbn0+XHJcbiAgICAgICAgICAgIOqyjOyLnOusvFxyXG4gICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgPC9MaW5rPixcclxuICAgICAgICA8TGluayBocmVmPVwiL0ZvbGxvd0xpc3RcIiBrZXk9XCJmb2xsb3dlclwiPlxyXG4gICAgICAgICAgPEJ1dHRvbiB0eXBlPVwibGlua1wiIHN0eWxlPXtzdHlsZXMuYWN0aW9uQnV0dG9ufT5cclxuICAgICAgICAgICAg7YyU66Gc7JuMXHJcbiAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICA8L0xpbms+LFxyXG4gICAgICAgIDxMaW5rIGhyZWY9XCIvRm9sbG93aW5nTGlzdFwiIGtleT1cImZvbGxvd2luZ1wiPlxyXG4gICAgICAgICAgPEJ1dHRvbiB0eXBlPVwibGlua1wiIHN0eWxlPXtzdHlsZXMuYWN0aW9uQnV0dG9ufT5cclxuICAgICAgICAgICAg7YyU66Gc7J6JXHJcbiAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICA8L0xpbms+LFxyXG4gICAgICBdfVxyXG4gICAgPlxyXG4gICAgIFxyXG4gICAgICA8Q2FyZC5NZXRhXHJcbiAgICAgICAgYXZhdGFyPXs8QXZhdGFyIHN0eWxlPXtzdHlsZXMuYXZhdGFyfT57J04nfTwvQXZhdGFyPn0gLy8gQXZhdGFyIOyKpO2DgOydvCDsoIHsmqlcclxuICAgICAgICB0aXRsZT1cIk5vb3B5XCJcclxuICAgICAgICBkZXNjcmlwdGlvbj1cIuuwqeqwgCDrsKnqsIBcIlxyXG4gICAgICAvPlxyXG5cclxuICAgICAgXHJcbiAgICAgIDxCdXR0b25cclxuICAgICAgICBvbkNsaWNrPXtvbkxvZ091dH1cclxuICAgICAgICB0eXBlPVwicHJpbWFyeVwiXHJcbiAgICAgICAgc3R5bGU9e3N0eWxlcy5idXR0b259IC8vIEJ1dHRvbiDsiqTtg4Dsnbwg7KCB7JqpXHJcbiAgICAgID5cclxuICAgICAgICDroZzqt7jslYTsm4NcclxuICAgICAgPC9CdXR0b24+XHJcbiAgICA8L0NhcmQ+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXJQcm9maWxlO1xyXG4qL1xyXG5cclxuLyppbXBvcnQgeyBBdmF0YXIsIEJ1dHRvbiwgQ2FyZCB9IGZyb20gXCJhbnRkXCI7XHJcbmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG5jb25zdCBVc2VyUHJvZmlsZSA9ICh7IHNldElzTG9nZ2VkIH0pID0+IHtcclxuICAvLyDroZzqt7jslYTsm4Mg7ZW465Ok65+sXHJcbiAgY29uc3Qgb25Mb2dPdXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRJc0xvZ2dlZChmYWxzZSk7XHJcbiAgfSwgW3NldElzTG9nZ2VkXSk7IC8vIOydmOyhtOyEsSDrsLDsl7Tsl5Agc2V0SXNMb2dnZWQg7LaU6rCAXHJcblxyXG4gIC8vIOyKpO2DgOydvCDqsJ3ssrTrpbwgdXNlTWVtb+uhnCDrqZTrqqjsnbTsoJzsnbTshZhcclxuICBjb25zdCBzdHlsZXMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgY2FyZENvbnRhaW5lcjogeyBtYXJnaW5Ub3A6IFwiMTZweFwiIH0sIC8vIENhcmTsnZggbWFyZ2luLXRvcCDsiqTtg4DsnbxcclxuICAgICAgYnV0dG9uOiB7IG1hcmdpblRvcDogXCIxNnB4XCIgfSwgLy8gQnV0dG9u7J2YIG1hcmdpbi10b3Ag7Iqk7YOA7J28XHJcbiAgICAgIGF2YXRhcjogeyBiYWNrZ3JvdW5kQ29sb3I6IFwiIzg3ZDA2OFwiIH0sIC8vIEF2YXRhciDsiqTtg4DsnbxcclxuICAgIH0pLFxyXG4gICAgW11cclxuICApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPENhcmRcclxuICAgICAgc3R5bGU9e3N0eWxlcy5jYXJkQ29udGFpbmVyfSAvLyBDYXJk7J2YIOyKpO2DgOydvCDsoIHsmqlcclxuICAgICAgYWN0aW9ucz17W1xyXG4gICAgICAgIDxkaXYga2V5PVwicG9zdFwiPuqyjOyLnOusvCA8YnIgLz4gMCA8L2Rpdj4sXHJcbiAgICAgICAgPGRpdiBrZXk9XCJmb2xsb3dlclwiPu2MlOuhnOybjCA8YnIgLz4gMCA8L2Rpdj4sXHJcbiAgICAgICAgPGRpdiBrZXk9XCJmb2xsb3dpbmdcIj7tjJTroZzsnokgPGJyIC8+IDAgPC9kaXY+LFxyXG4gICAgICBdfVxyXG4gICAgPlxyXG4gICAgIFxyXG4gICAgICA8Q2FyZC5NZXRhXHJcbiAgICAgICAgYXZhdGFyPXs8QXZhdGFyIHN0eWxlPXtzdHlsZXMuYXZhdGFyfT57J04nfTwvQXZhdGFyPn0gLy8gQXZhdGFyIOyKpO2DgOydvCDsoIHsmqlcclxuICAgICAgICB0aXRsZT1cIk5vb3B5XCJcclxuICAgICAgICBkZXNjcmlwdGlvbj1cIuuwqeqwgCDrsKnqsIBcIlxyXG4gICAgICAvPlxyXG5cclxuICAgICBcclxuICAgICAgPEJ1dHRvblxyXG4gICAgICAgIG9uQ2xpY2s9e29uTG9nT3V0fVxyXG4gICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcclxuICAgICAgICBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gLy8gQnV0dG9uIOyKpO2DgOydvCDsoIHsmqlcclxuICAgICAgPlxyXG4gICAgICAgIOuhnOq3uOyVhOybg1xyXG4gICAgICA8L0J1dHRvbj5cclxuICAgIDwvQ2FyZD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXNlclByb2ZpbGU7XHJcbiovIl0sIm5hbWVzIjpbIkF2YXRhciIsIkJ1dHRvbiIsIkNhcmQiLCJ1c2VDYWxsYmFjayIsInVzZU1lbW8iLCJ1c2VFZmZlY3QiLCJ1c2VEaXNwYXRjaCIsInVzZVNlbGVjdG9yIiwibG9nT3V0IiwiVXNlclByb2ZpbGUiLCJtZSIsImRpc3BhdGNoIiwibG9nT3V0TG9hZGluZyIsInN0YXRlIiwidXNlciIsImNvbnNvbGUiLCJsb2ciLCJsb2dJbiIsIm5pY2tuYW1lIiwiZW1haWwiLCJvbkxvZ091dCIsInN0eWxlcyIsImNhcmRDb250YWluZXIiLCJtYXJnaW5Ub3AiLCJidXR0b24iLCJhdmF0YXIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzdHlsZSIsImFjdGlvbnMiLCJkaXYiLCJiciIsIk1ldGEiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwib25DbGljayIsInR5cGUiLCJsb2FkaW5nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/UserProfile.js\n"));

/***/ })

});