/**
 * Mapping the property
 * @param sourceProperty -> source property
 * @param type -> type of class (use for Object class, no need you for primitive types)
 */
export declare function propertyMapper(sourceProperty: string, type?: any): (target: any, propertyKey: string) => void;
