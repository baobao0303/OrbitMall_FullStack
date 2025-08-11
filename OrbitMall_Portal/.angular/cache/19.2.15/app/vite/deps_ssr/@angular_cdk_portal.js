import { createRequire } from 'module';const require = createRequire(import.meta.url);
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
} from "./chunk-FHAOW5H6.js";
import "./chunk-XZIY4MOL.js";
import "./chunk-POUHVWWY.js";
import "./chunk-SWIVHK54.js";
import "./chunk-AQYIT73X.js";
import "./chunk-YHCV7DAQ.js";

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
