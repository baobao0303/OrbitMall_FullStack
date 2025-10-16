import {
  BasePortalHost,
  BasePortalOutlet,
  CdkPortal,
  CdkPortalOutlet,
  ComponentPortal,
  DomPortal,
  DomPortalHost,
  DomPortalOutlet,
  Portal,
  PortalHostDirective,
  PortalModule,
  TemplatePortal,
  TemplatePortalDirective
} from "./chunk-V6JPRHKO.js";
import "./chunk-5TZJ3735.js";
import "./chunk-QIY2MKEB.js";
import "./chunk-OZIU6ILR.js";
import "./chunk-6CHVVP4N.js";
import "./chunk-EPAV4CNQ.js";

// node_modules/@angular/cdk/fesm2022/portal.mjs
var PortalInjector = class {
  _parentInjector;
  _customTokens;
  constructor(_parentInjector, _customTokens) {
    this._parentInjector = _parentInjector;
    this._customTokens = _customTokens;
  }
  get(token, notFoundValue) {
    const value = this._customTokens.get(token);
    if (typeof value !== "undefined") {
      return value;
    }
    return this._parentInjector.get(token, notFoundValue);
  }
};
export {
  BasePortalHost,
  BasePortalOutlet,
  CdkPortal,
  CdkPortalOutlet,
  ComponentPortal,
  DomPortal,
  DomPortalHost,
  DomPortalOutlet,
  Portal,
  PortalHostDirective,
  PortalInjector,
  PortalModule,
  TemplatePortal,
  TemplatePortalDirective
};
//# sourceMappingURL=@angular_cdk_portal.js.map
