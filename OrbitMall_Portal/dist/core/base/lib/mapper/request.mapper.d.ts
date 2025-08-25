/**
 * Request mapper
 */
export declare class RequestMapper<T> {
    _propertyMapping: any;
    _typeList: any;
    _target: any;
    constructor(type: {
        new (): T;
    });
    map(source: any): any;
}
