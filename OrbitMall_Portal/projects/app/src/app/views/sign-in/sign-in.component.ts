import { Component, OnInit } from '@angular/core';
import { VIEW_CONTEXT, ViewBase } from '@view/base';

import { SignInContext } from './sign-in.context';

@Component({
  selector: 'orbitmail-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  providers: [{ provide: VIEW_CONTEXT, useClass: SignInContext }],
})
export class SignInComponent extends ViewBase implements OnInit {
  ngOnInit(): void {}
}
