/**
 * Response mapper
 */
export declare class ResponseMapper<T> {
    _propertyMapping: any;
    _typeList: any;
    _target: any;
    constructor(type: {
        new (): T;
    });
    findValueByKey(obj: any, key: any): any;
    map(source: any): any;
}
