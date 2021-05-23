import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// HttpClient and routing
// Its makes possible for the client app to communicate with the API or server-side.
import{ HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

// Angular Materials Elements
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

// UI Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

// App Components
import { AppComponent } from './app.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MovieDescriptionComponent } from './movie-description/movie-description.component';
import { MovieGenreComponent } from './movie-genre/movie-genre.component';
/*
import { MovieDirectorComponent } from './movie-director/movie-director.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RemoveAccountComponent } from './remove-account/remove-account.component';
*/

const appRoutes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'documentaries', component: MovieCardComponent },
  //{ path: 'profile', component: UserProfileComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginComponent,
    MovieCardComponent,
    WelcomePageComponent,
    NavBarComponent,
    MovieDescriptionComponent,
    MovieGenreComponent
    /*
    MovieDirectorComponent,
    RemoveAccountComponent,
    */
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    MatMenuModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatToolbarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
