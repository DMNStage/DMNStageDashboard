import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';
import {AgmCoreModule} from '@agm/core';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AdminService} from '../services/admin.service';
import {ClientService} from '../services/client.service';
import {AuthService} from '../services/auth.service';
import {ConfigService} from '../services/config.service';
import {ProductService} from '../services/product.service';
import {SubproductService} from '../services/subproduct.service';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        // HttpModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        })
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent
    ],
    providers: [AdminService, ClientService, ConfigService, ProductService, SubproductService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
