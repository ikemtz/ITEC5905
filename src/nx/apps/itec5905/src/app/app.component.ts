import { Component } from '@angular/core';
import { OidcFacade } from 'imng-oidc-client';

@Component({
  selector: 'init-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public oidcFacade: OidcFacade) {}
  public login(): void {
    this.oidcFacade.signinRedirect();
  }
}
