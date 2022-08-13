"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalProvider = exports.usePortal = exports.Portal = void 0;
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var Portal = function (_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? 'root-portal' : _b, _c = _a.el, el = _c === void 0 ? 'div' : _c;
    var container = (0, react_1.useState)(function () {
        return document.createElement(el);
    })[0];
    react_1.default.useEffect(function () {
        container.classList.add(className);
        document.body.appendChild(container);
        return function () {
            document.body.removeChild(container);
        };
    }, []);
    return react_dom_1.default.createPortal(children, container);
};
exports.Portal = Portal;
var PortalContext = (0, react_1.createContext)({ open: function () { }, hide: function () { } });
var usePortal = function (Component) {
    var ctx = (0, react_1.useContext)(PortalContext);
    return function (props) {
        return new Promise(function (resolve) {
            var key = Math.random().toString().replace('.', '');
            ctx.open(react_1.default.createElement(Component, { key: key, props: props, open: true, onClose: function (res) {
                    ctx.hide(key);
                    resolve(res);
                } }));
        });
    };
};
exports.usePortal = usePortal;
var PortalProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)([]), components = _b[0], setComponents = _b[1];
    var value = (0, react_1.useMemo)(function () { return ({
        open: function (component) {
            setComponents(__spreadArray(__spreadArray([], components, true), [component], false));
        },
        hide: function (key) {
            setComponents(components.filter(function (c) { return c.key !== key; }));
        }
    }); }, []);
    return (react_1.default.createElement(PortalContext.Provider, { value: value },
        children,
        react_1.default.createElement(exports.Portal, null, components)));
};
exports.PortalProvider = PortalProvider;
