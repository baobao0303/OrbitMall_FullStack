import { Component } from '@angular/core';
import { SignUpContext } from './sign-up.context';
import { VIEW_CONTEXT } from '@view/base';

@Component({
    selector: 'orbitmail-sign-up',
    imports: [],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
    providers: [{ provide: VIEW_CONTEXT, useClass: SignUpContext }]
})
export class SignUpComponent {}
