import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';
import {AgmCoreModule} from '@agm/core';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AdminService} from './services/admin.service';
import {ClientService} from './services/client.service';
import {AuthService} from './services/auth.service';
import {SignInComponent} from './sign-in/sign-in.component';
import {AuthGuard} from './services/auth/auth.guard';
import {AuthInterceptor} from './services/auth/auth.interceptor';
import {MatButtonModule, MatDialogModule, MatIconModule, MatInputModule} from '@angular/material';
import {ConfigService} from './services/config.service';
import {ProductService} from './services/product.service';
import {SubproductService} from './services/subproduct.service';
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {NgProgressRouterModule} from '@ngx-progressbar/router';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        // HttpModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,

        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        }),
        NgProgressModule.forRoot({
            color: 'red',
            thick: true
        }),
        NgProgressHttpModule.forRoot(),
        NgProgressRouterModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        SignInComponent
    ],
    providers: [AdminService, ClientService, ConfigService, ProductService, SubproductService, AuthService, AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }/*, {
            provide: HTTP_INTERCEPTORS,
            useClass: NgProgressInterceptor,
            multi: true
        }*/],
    bootstrap: [AppComponent]
})
export class AppModule { }
