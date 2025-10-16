/**
 * Response mapper
 */
export class ResponseMapper {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UubWFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9iYXNlL3NyYy9saWIvbWFwcGVyL3Jlc3BvbnNlLm1hcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE1BQU0sT0FBTyxjQUFjO0lBS3pCLFlBQVksSUFBbUI7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7UUFDOUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7SUFDdEQsQ0FBQztJQUVELGNBQWMsQ0FBQyxHQUFRLEVBQUUsR0FBUTtRQUMvQixJQUFJLE1BQVcsQ0FBQztRQUNoQixLQUFLLElBQUksUUFBUSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3pCLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2dCQUNqQyx5Q0FBeUM7Z0JBQ3pDLElBQUksUUFBUSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7b0JBQzFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCwyQkFBMkI7UUFDM0IsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELEdBQUcsQ0FBQyxNQUFXO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDeEMsTUFBTSxTQUFTLEdBQ2IsSUFBSSxDQUFDLGdCQUFnQixLQUFLLFNBQVM7Z0JBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDO2dCQUM1QixDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ2hCLElBQUksU0FBUyxFQUFFLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM3RCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN2RCxDQUFDO1lBQ0QsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQzFDLDBDQUEwQztnQkFDMUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNyQzs7Ozt1QkFJRztvQkFDSCxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQzt3QkFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQ3RELElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQ2xELENBQUM7b0JBQ0osQ0FBQztnQkFDSCxDQUFDO3FCQUFNLENBQUM7b0JBQ04sbUNBQW1DO29CQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQ2xCLENBQUM7Z0JBQ0osQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJlc3BvbnNlIG1hcHBlclxuICovXG5leHBvcnQgY2xhc3MgUmVzcG9uc2VNYXBwZXI8VD4ge1xuICBfcHJvcGVydHlNYXBwaW5nOiBhbnk7XG4gIF90eXBlTGlzdDogYW55O1xuICBfdGFyZ2V0OiBhbnk7XG5cbiAgY29uc3RydWN0b3IodHlwZTogeyBuZXcgKCk6IFQgfSkge1xuICAgIHRoaXMuX3RhcmdldCA9IG5ldyB0eXBlKCk7XG4gICAgdGhpcy5fcHJvcGVydHlNYXBwaW5nID0gdGhpcy5fdGFyZ2V0LmNvbnN0cnVjdG9yLl9wcm9wZXJ0eU1hcDtcbiAgICB0aGlzLl90eXBlTGlzdCA9IHRoaXMuX3RhcmdldC5jb25zdHJ1Y3Rvci5fdHlwZUxpc3Q7XG4gIH1cblxuICBmaW5kVmFsdWVCeUtleShvYmo6IGFueSwga2V5OiBhbnkpIHtcbiAgICBsZXQgcmVzdWx0OiBhbnk7XG4gICAgZm9yIChsZXQgcHJvcGVydHkgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAvLyBJZiBub3QgbnVsbCBhbmQgbWF0Y2gga2V5IHJldHVybiB2YWx1ZVxuICAgICAgICBpZiAocHJvcGVydHkgPT09IGtleSAmJiBvYmpba2V5XSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBEZWZhdWx0IHJldHVybiB1bmRlZmluZWRcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgbWFwKHNvdXJjZTogYW55KSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5fdGFyZ2V0KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IG1hcHBlZEtleSA9XG4gICAgICAgIHRoaXMuX3Byb3BlcnR5TWFwcGluZyAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyB0aGlzLl9wcm9wZXJ0eU1hcHBpbmdba2V5XVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKG1hcHBlZEtleSkge1xuICAgICAgICB0aGlzLl90YXJnZXRba2V5XSA9IHRoaXMuZmluZFZhbHVlQnlLZXkoc291cmNlLCBtYXBwZWRLZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fdGFyZ2V0W2tleV0gPSB0aGlzLmZpbmRWYWx1ZUJ5S2V5KHNvdXJjZSwga2V5KTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fdGFyZ2V0W2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIElmIHZhbHVlIGlzIGFycmF5IGNhbGxiYWNrIGVhY2ggZWxlbWVudFxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl90YXJnZXRba2V5XSkpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBDaGVjayBjb25kaXRpb24gaXMgYXJyYXkuXG4gICAgICAgICAgICogaWYgaXQgaXMgYXJyYXkgdG8gY2hlY2sgZWxlbWVudCBvZiBhcnJheSBpcyBvYmplY3Qgb3Igbm90XG4gICAgICAgICAgICogaWYgZWxlbWVudCBpcyBvYmplY3QsIG1hcCBlbGVtZW50IGluIGFycmF5XG4gICAgICAgICAgICovXG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl90YXJnZXRba2V5XVswXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldFtrZXldID0gdGhpcy5fdGFyZ2V0W2tleV0ubWFwKChpdGVtOiBhbnkpID0+XG4gICAgICAgICAgICAgIG5ldyBSZXNwb25zZU1hcHBlcih0aGlzLl90eXBlTGlzdFtrZXldKS5tYXAoaXRlbSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIElmIHZhbHVlIGlzIG9iamVjdCBvbmx5IGNhbGxiYWNrXG4gICAgICAgICAgdGhpcy5fdGFyZ2V0W2tleV0gPSBuZXcgUmVzcG9uc2VNYXBwZXIodGhpcy5fdHlwZUxpc3Rba2V5XSkubWFwKFxuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0W2tleV1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcbiAgfVxufVxuIl19