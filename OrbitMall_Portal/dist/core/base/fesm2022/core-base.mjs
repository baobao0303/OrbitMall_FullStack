import { InjectionToken } from '@angular/core';
import { __decorate } from 'tslib';

/**
 * Mapping the property
 * @param sourceProperty -> source property
 * @param type -> type of class (use for Object class, no need you for primitive types)
 */
function propertyMapper(sourceProperty, type) {
    return function (target, propertyKey) {
        if (!target.constructor._propertyMap) {
            target.constructor._propertyMap = {};
        }
        target.constructor._propertyMap[propertyKey] = sourceProperty;
        if (!target.constructor._typeList) {
            target.constructor._typeList = {};
        }
        target.constructor._typeList[propertyKey] = type;
    };
}

/**
 * Response mapper
 */
class ResponseMapper {
    constructor(type) {
        this._target = new type();
        this._propertyMapping = this._target.constructor._propertyMap;
        this._typeList = this._target.constructor._typeList;
    }
    findValueByKey(obj, key) {
        let result;
        for (let property in obj) {
            if (obj.hasOwnProperty(property)) {
                // If not null and match key return value
                if (property === key && obj[key] !== null) {
                    return obj[key];
                }
            }
        }
        // Default return undefined
        return result;
    }
    map(source) {
        Object.keys(this._target).forEach((key) => {
            const mappedKey = this._propertyMapping !== undefined
                ? this._propertyMapping[key]
                : undefined;
            if (mappedKey) {
                this._target[key] = this.findValueByKey(source, mappedKey);
            }
            else {
                this._target[key] = this.findValueByKey(source, key);
            }
            if (typeof this._target[key] === 'object') {
                // If value is array callback each element
                if (Array.isArray(this._target[key])) {
                    /**
                     * Check condition is array.
                     * if it is array to check element of array is object or not
                     * if element is object, map element in array
                     */
                    if (typeof this._target[key][0] === 'object') {
                        this._target[key] = this._target[key].map((item) => new ResponseMapper(this._typeList[key]).map(item));
                    }
                }
                else {
                    // If value is object only callback
                    this._target[key] = new ResponseMapper(this._typeList[key]).map(this._target[key]);
                }
            }
        });
        return this._target;
    }
}

/**
 * Request mapper
 */
class RequestMapper {
    constructor(type) {
        this._target = new type();
        this._propertyMapping = this._target.constructor._propertyMap;
        this._typeList = this._target.constructor._typeList;
    }
    map(source) {
        if (!this._propertyMapping) {
            throw new Error('No properties have been mapped.');
        }
        const requestBody = {};
        for (const propertyKey in this._propertyMapping) {
            if (source.hasOwnProperty(propertyKey)) {
                const snakeCaseKey = this._propertyMapping[propertyKey];
                let value = source[propertyKey];
                if (typeof value === 'object' && value !== null) {
                    if (Array.isArray(value)) {
                        if (this._typeList && this._typeList[propertyKey]) {
                            value = value.map((item) => new RequestMapper(this._typeList[propertyKey]).map(item));
                        }
                    }
                    else {
                        if (this._typeList && this._typeList[propertyKey]) {
                            value = new RequestMapper(this._typeList[propertyKey]).map(value);
                        }
                    }
                }
                requestBody[snakeCaseKey] = value;
            }
        }
        return requestBody;
    }
}

const BASE_REPOSITORY = new InjectionToken('BASE_REPOSITORY');

const READABLE_REPOSITORY = new InjectionToken('READABLE_REPOSITORY');

const WRITEABLE_REPOSITORY = new InjectionToken('WriteableRepository');

class BOBase {
}

/**
 * Defines Paging BO Base
 */
class PagingBaseResponse {
    constructor(init = {}) {
        this.activePage = 0;
        this.totalPages = 0;
        this.totalItems = 0;
        this.pageSize = 0;
        Object.assign(this, init);
    }
}
__decorate([
    propertyMapper('activePage', Number)
], PagingBaseResponse.prototype, "activePage", void 0);
__decorate([
    propertyMapper('totalPages', Number)
], PagingBaseResponse.prototype, "totalPages", void 0);
__decorate([
    propertyMapper('totalItems', Number)
], PagingBaseResponse.prototype, "totalItems", void 0);
__decorate([
    propertyMapper('pageSize', Number)
], PagingBaseResponse.prototype, "pageSize", void 0);

class PagingBaseRequest {
    constructor(init = {}) {
        this.page = 1;
        this.pageSize = 16;
        this.sort = '';
        this.filters = '';
        Object.assign(this, init);
    }
}
__decorate([
    propertyMapper('Page', Number)
], PagingBaseRequest.prototype, "page", void 0);
__decorate([
    propertyMapper('PageSize', Number)
], PagingBaseRequest.prototype, "pageSize", void 0);
__decorate([
    propertyMapper('Sort', String)
], PagingBaseRequest.prototype, "sort", void 0);
__decorate([
    propertyMapper('Filters', String)
], PagingBaseRequest.prototype, "filters", void 0);

/*
 * Public API Surface of base
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BASE_REPOSITORY, BOBase, PagingBaseRequest, PagingBaseResponse, READABLE_REPOSITORY, RequestMapper, ResponseMapper, WRITEABLE_REPOSITORY, propertyMapper };
//# sourceMappingURL=core-base.mjs.map
