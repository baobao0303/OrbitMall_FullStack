import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  BlockScrollStrategy,
  CdkConnectedOverlay,
  CdkFixedSizeVirtualScroll,
  CdkOverlayOrigin,
  CdkScrollable,
  CdkScrollableModule,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
  CdkVirtualScrollableElement,
  CdkVirtualScrollableWindow,
  CloseScrollStrategy,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  GlobalPositionStrategy,
  NoopScrollStrategy,
  Overlay,
  OverlayConfig,
  OverlayContainer,
  OverlayKeyboardDispatcher,
  OverlayModule,
  OverlayOutsideClickDispatcher,
  OverlayPositionBuilder,
  OverlayRef,
  RepositionScrollStrategy,
  STANDARD_DROPDOWN_ADJACENT_POSITIONS,
  STANDARD_DROPDOWN_BELOW_POSITIONS,
  ScrollDispatcher,
  ScrollStrategyOptions,
  ScrollingVisibility,
  ViewportRuler,
  validateHorizontalPosition,
  validateVerticalPosition
} from "./chunk-JCIWAJYY.js";
import {
  Dir
} from "./chunk-MHUCIAT3.js";
import "./chunk-FHAOW5H6.js";
import "./chunk-XZIY4MOL.js";
import "./chunk-POUHVWWY.js";
import {
  Injectable,
  RendererFactory2,
  inject,
  require_operators,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-SWIVHK54.js";
import {
  require_cjs
} from "./chunk-AQYIT73X.js";
import {
  __toESM
} from "./chunk-YHCV7DAQ.js";

// node_modules/@angular/cdk/fesm2022/overlay.mjs
var import_rxjs = __toESM(require_cjs(), 1);
var import_operators = __toESM(require_operators(), 1);
var FullscreenOverlayContainer = class _FullscreenOverlayContainer extends OverlayContainer {
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _fullScreenEventName;
  _cleanupFullScreenListener;
  constructor() {
    super();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._cleanupFullScreenListener?.();
  }
  _createContainer() {
    const eventName = this._getEventName();
    super._createContainer();
    this._adjustParentForFullscreenChange();
    if (eventName) {
      this._cleanupFullScreenListener?.();
      this._cleanupFullScreenListener = this._renderer.listen("document", eventName, () => {
        this._adjustParentForFullscreenChange();
      });
    }
  }
  _adjustParentForFullscreenChange() {
    if (this._containerElement) {
      const fullscreenElement = this.getFullscreenElement();
      const parent = fullscreenElement || this._document.body;
      parent.appendChild(this._containerElement);
    }
  }
  _getEventName() {
    if (!this._fullScreenEventName) {
      const _document = this._document;
      if (_document.fullscreenEnabled) {
        this._fullScreenEventName = "fullscreenchange";
      } else if (_document.webkitFullscreenEnabled) {
        this._fullScreenEventName = "webkitfullscreenchange";
      } else if (_document.mozFullScreenEnabled) {
        this._fullScreenEventName = "mozfullscreenchange";
      } else if (_document.msFullscreenEnabled) {
        this._fullScreenEventName = "MSFullscreenChange";
      }
    }
    return this._fullScreenEventName;
  }
  /**
   * When the page is put into fullscreen mode, a specific element is specified.
   * Only that element and its children are visible when in fullscreen mode.
   */
  getFullscreenElement() {
    const _document = this._document;
    return _document.fullscreenElement || _document.webkitFullscreenElement || _document.mozFullScreenElement || _document.msFullscreenElement || null;
  }
  static ɵfac = function FullscreenOverlayContainer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FullscreenOverlayContainer)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _FullscreenOverlayContainer,
    factory: _FullscreenOverlayContainer.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FullscreenOverlayContainer, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
export {
  BlockScrollStrategy,
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  CdkScrollable,
  CloseScrollStrategy,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  FullscreenOverlayContainer,
  GlobalPositionStrategy,
  NoopScrollStrategy,
  Overlay,
  OverlayConfig,
  OverlayContainer,
  OverlayKeyboardDispatcher,
  OverlayModule,
  OverlayOutsideClickDispatcher,
  OverlayPositionBuilder,
  OverlayRef,
  RepositionScrollStrategy,
  STANDARD_DROPDOWN_ADJACENT_POSITIONS,
  STANDARD_DROPDOWN_BELOW_POSITIONS,
  ScrollDispatcher,
  ScrollStrategyOptions,
  ScrollingVisibility,
  ViewportRuler,
  validateHorizontalPosition,
  validateVerticalPosition,
  CdkFixedSizeVirtualScroll as ɵɵCdkFixedSizeVirtualScroll,
  CdkScrollableModule as ɵɵCdkScrollableModule,
  CdkVirtualForOf as ɵɵCdkVirtualForOf,
  CdkVirtualScrollViewport as ɵɵCdkVirtualScrollViewport,
  CdkVirtualScrollableElement as ɵɵCdkVirtualScrollableElement,
  CdkVirtualScrollableWindow as ɵɵCdkVirtualScrollableWindow,
  Dir as ɵɵDir
};
//# sourceMappingURL=@angular_cdk_overlay.js.map
