import * as i0 from '@angular/core';
import { Injectable, Component } from '@angular/core';

class CommandsService {
    constructor() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: CommandsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: CommandsService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: CommandsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class CommandsComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: CommandsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: CommandsComponent, isStandalone: true, selector: "lib-commands", ngImport: i0, template: `
    <p>
      commands works!
    </p>
  `, isInline: true, styles: [""] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: CommandsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-commands', standalone: true, imports: [], template: `
    <p>
      commands works!
    </p>
  ` }]
        }] });

/*
 * Public API Surface of commands
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CommandsComponent, CommandsService };
//# sourceMappingURL=application-commands.mjs.map
