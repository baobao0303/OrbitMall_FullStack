import { __decorate } from 'tslib';
import { propertyMapper } from '@core/base';
import { HttpStatusCode } from '@angular/common/http';

class IdBO {
    constructor() {
        this.id = '';
    }
}
__decorate([
    propertyMapper('id', String)
], IdBO.prototype, "id", void 0);

class GetAllWeatherRequest {
}

class GetAllWeatherResponse {
    constructor() {
        this.date = '';
        this.summary = '';
        this.temperatureC = 0;
        this.temperatureF = 0;
    }
}
__decorate([
    propertyMapper('date', String)
], GetAllWeatherResponse.prototype, "date", void 0);
__decorate([
    propertyMapper('summary', String)
], GetAllWeatherResponse.prototype, "summary", void 0);
__decorate([
    propertyMapper('summary', Number)
], GetAllWeatherResponse.prototype, "temperatureC", void 0);
__decorate([
    propertyMapper('summary', Number)
], GetAllWeatherResponse.prototype, "temperatureF", void 0);

class GetAllViewsRequest {
}

class ViewBO {
    constructor() {
        this.id = '';
        this.title = '';
        this.icon = '';
        this.vId = '';
        this.label = '';
        this.parentViewId = null;
        this.viewChildren = [];
    }
}
__decorate([
    propertyMapper('id', String)
], ViewBO.prototype, "id", void 0);
__decorate([
    propertyMapper('title', String)
], ViewBO.prototype, "title", void 0);
__decorate([
    propertyMapper('icon', String)
], ViewBO.prototype, "icon", void 0);
__decorate([
    propertyMapper('vId', String)
], ViewBO.prototype, "vId", void 0);
__decorate([
    propertyMapper('label', String)
], ViewBO.prototype, "label", void 0);
__decorate([
    propertyMapper('parentViewId', String)
], ViewBO.prototype, "parentViewId", void 0);
__decorate([
    propertyMapper('viewChildren', ViewBO)
], ViewBO.prototype, "viewChildren", void 0);

class GetAllViewsResponse {
    constructor() {
        this.id = '';
        this.title = '';
        this.icon = '';
        this.vId = '';
        this.label = '';
        this.parentViewId = null;
        this.viewChildren = [];
    }
}
__decorate([
    propertyMapper('id', String)
], GetAllViewsResponse.prototype, "id", void 0);
__decorate([
    propertyMapper('title', String)
], GetAllViewsResponse.prototype, "title", void 0);
__decorate([
    propertyMapper('icon', String)
], GetAllViewsResponse.prototype, "icon", void 0);
__decorate([
    propertyMapper('vId', String)
], GetAllViewsResponse.prototype, "vId", void 0);
__decorate([
    propertyMapper('label', String)
], GetAllViewsResponse.prototype, "label", void 0);
__decorate([
    propertyMapper('parentViewId', String)
], GetAllViewsResponse.prototype, "parentViewId", void 0);
__decorate([
    propertyMapper('viewChildren', ViewBO)
], GetAllViewsResponse.prototype, "viewChildren", void 0);

class GetByVidViewRequest {
    constructor(vid) {
        this.vid = '';
        this.vid = vid;
    }
}
__decorate([
    propertyMapper('vid', String)
], GetByVidViewRequest.prototype, "vid", void 0);

class GetByVidViewResponse {
    constructor() {
        this.title = '';
    }
}
__decorate([
    propertyMapper('title', String)
], GetByVidViewResponse.prototype, "title", void 0);

class ViewAllowBO {
    constructor() {
        this.allowReadMutually = false;
        this.allowReadPrivately = false;
        this.allowUpdated = false;
        this.allowDeleted = false;
        this.allowCreated = false;
    }
}
__decorate([
    propertyMapper('allowReadMutually', String)
], ViewAllowBO.prototype, "allowReadMutually", void 0);
__decorate([
    propertyMapper('allowReadPrivately', Boolean)
], ViewAllowBO.prototype, "allowReadPrivately", void 0);
__decorate([
    propertyMapper('allowUpdated', Boolean)
], ViewAllowBO.prototype, "allowUpdated", void 0);
__decorate([
    propertyMapper('allowDeleted', Boolean)
], ViewAllowBO.prototype, "allowDeleted", void 0);
__decorate([
    propertyMapper('allowCreated', Boolean)
], ViewAllowBO.prototype, "allowCreated", void 0);

class GetByRoleIdViewRequest {
    constructor(id) {
        this.id = '';
        this.id = id;
    }
}
__decorate([
    propertyMapper('RoleId')
], GetByRoleIdViewRequest.prototype, "id", void 0);

class GetByRoleIdViewResponse {
    constructor() {
        this.id = '';
        this.title = '';
        this.icon = '';
        this.vId = '';
        this.label = '';
        this.action = [];
    }
}
__decorate([
    propertyMapper('id', String)
], GetByRoleIdViewResponse.prototype, "id", void 0);
__decorate([
    propertyMapper('title', String)
], GetByRoleIdViewResponse.prototype, "title", void 0);
__decorate([
    propertyMapper('icon', String)
], GetByRoleIdViewResponse.prototype, "icon", void 0);
__decorate([
    propertyMapper('vId', String)
], GetByRoleIdViewResponse.prototype, "vId", void 0);
__decorate([
    propertyMapper('label', String)
], GetByRoleIdViewResponse.prototype, "label", void 0);
__decorate([
    propertyMapper('action', ViewAllowBO)
], GetByRoleIdViewResponse.prototype, "action", void 0);

class VRTOErrorResponse {
    constructor(title = '', status = HttpStatusCode.Unauthorized, detail = '') {
        this.title = '';
        this.status = HttpStatusCode.Unauthorized;
        this.detail = '';
        this.title = title;
        this.status = status;
        this.detail = detail;
    }
}
__decorate([
    propertyMapper('title', String)
], VRTOErrorResponse.prototype, "title", void 0);
__decorate([
    propertyMapper('status', Number)
], VRTOErrorResponse.prototype, "status", void 0);
__decorate([
    propertyMapper('detail', String)
], VRTOErrorResponse.prototype, "detail", void 0);

class VRTORequest {
    constructor() {
        this.vrto = '';
    }
}
__decorate([
    propertyMapper('vrto', String)
], VRTORequest.prototype, "vrto", void 0);

class VRTOResponse {
    constructor() {
        this.vato = '';
        this.vrto = '';
    }
}
__decorate([
    propertyMapper('vato', String)
], VRTOResponse.prototype, "vato", void 0);
__decorate([
    propertyMapper('vrto', String)
], VRTOResponse.prototype, "vrto", void 0);

class VerifyValidVATORequest {
}

class VerifyValidVATOResponse {
    constructor() {
        this.isValid = false;
    }
}
__decorate([
    propertyMapper('isValid', Boolean)
], VerifyValidVATOResponse.prototype, "isValid", void 0);

/*
 * Public API Surface of messages
 */

/**
 * Generated bundle index. Do not edit.
 */

export { GetAllViewsRequest, GetAllViewsResponse, GetAllWeatherRequest, GetAllWeatherResponse, GetByRoleIdViewRequest, GetByRoleIdViewResponse, GetByVidViewRequest, GetByVidViewResponse, IdBO, VRTOErrorResponse, VRTORequest, VRTOResponse, VerifyValidVATORequest, VerifyValidVATOResponse, ViewAllowBO, ViewBO };
//# sourceMappingURL=application-messages.mjs.map
