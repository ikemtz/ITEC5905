import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { OidcFacade, OidcUserFacade } from 'imng-oidc-client';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: OidcFacade, useValue: { loggedIn$: of(true) } },
        { provide: OidcUserFacade, useValue: { email$: of('test@email.com'), profilePicture$: of('test.png') } }]
    }).compileComponents();
  });

  it(`Should match snapshot`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
