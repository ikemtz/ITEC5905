import { Component } from '@angular/core';
import { OidcFacade, OidcUserFacade, IOidcUser } from 'imng-oidc-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'itec-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly identity$: Observable<IOidcUser | undefined>;
  public readonly email$: Observable<string | undefined>;
  public readonly loggedIn$: Observable<boolean>;
  public readonly profilePicture$: Observable<string | undefined>;
  constructor(
    public readonly oidcFacade: OidcFacade,
    private readonly oidcUserFacade: OidcUserFacade
  ) {
    this.identity$ = this.oidcFacade.identity$;
    this.email$ = this.oidcUserFacade.email$;
    this.loggedIn$ = this.oidcFacade.loggedIn$;
    this.profilePicture$ = this.oidcUserFacade.profilePicture$;
  }

  public login(): void {
    this.oidcFacade.signinRedirect();
  }
}
