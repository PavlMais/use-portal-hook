var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { createContext, useContext, useMemo, useState } from "react";
import ReactDOM from "react-dom";
export var Portal = function (_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? 'root-portal' : _b, _c = _a.el, el = _c === void 0 ? 'div' : _c;
    var container = useState(function () {
        return document.createElement(el);
    })[0];
    React.useEffect(function () {
        container.classList.add(className);
        document.body.appendChild(container);
        return function () {
            document.body.removeChild(container);
        };
    }, []);
    return ReactDOM.createPortal(children, container);
};
var PortalContext = createContext({ open: function () { }, hide: function () { } });
export var usePortal = function (Component) {
    var ctx = useContext(PortalContext);
    return function (props) {
        return new Promise(function (resolve) {
            var key = Math.random().toString().replace('.', '');
            ctx.open(React.createElement(Component, { key: key, props: props, open: true, onClose: function (res) {
                    ctx.hide(key);
                    resolve(res);
                } }));
        });
    };
};
export var PortalProvider = function (_a) {
    var children = _a.children;
    var _b = useState([]), components = _b[0], setComponents = _b[1];
    var value = useMemo(function () { return ({
        open: function (component) {
            setComponents(__spreadArray(__spreadArray([], components, true), [component], false));
        },
        hide: function (key) {
            setComponents(components.filter(function (c) { return c.key !== key; }));
        }
    }); }, []);
    return (React.createElement(PortalContext.Provider, { value: value },
        children,
        React.createElement(Portal, null, components)));
};
