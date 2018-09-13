import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
} from '@angular/material';
import {AdminsComponent} from '../../admins/admins.component';
import {ClientsComponent} from '../../clients/clients.component';
import {ProductsComponent} from '../../products/products.component';

import {CdkTableModule} from '@angular/cdk/table';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {AddClientComponent} from '../../add-client/add-client.component';
import {EditClientComponent} from '../../edit-client/edit-client.component';
import {AddAdminComponent} from '../../add-admin/add-admin.component';
import {EditAdminComponent} from '../../edit-admin/edit-admin.component';
import {ConfigComponent} from '../../config/config.component';
import {TreeviewModule} from 'ngx-treeview';
import {EditConfigComponent} from '../../edit-config/edit-config.component';
import {AddProductComponent} from '../../add-product/add-product.component';
import {AddSubproductComponent, SearchPipe} from '../../add-subproduct/add-subproduct.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {EditSubproductComponent} from '../../edit-subproduct/edit-subproduct.component';
import {EditProductComponent} from '../../edit-product/edit-product.component';

// import {TableOverviewExample} from './app/table-overview-example';

@NgModule({
    exports: [
        CdkTableModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
    ]
})
export class DemoMaterialModule {
}

@NgModule({
  imports: [
      // BrowserModule,
      // BrowserAnimationsModule,
      HttpModule,
      HttpClientModule,
      DemoMaterialModule,
      MatNativeDateModule,
      ReactiveFormsModule,

    CommonModule,
      TreeviewModule.forRoot(),
      NgxMaterialTimepickerModule.forRoot(),
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
      MatRadioModule,
  ],
    entryComponents: [ClientsComponent, AdminsComponent],
  declarations: [
      AdminsComponent,
      AddAdminComponent,
      EditAdminComponent,

      ClientsComponent,
      AddClientComponent,
      EditClientComponent,

      ProductsComponent,
      AddProductComponent,
      EditProductComponent,

      AddSubproductComponent,
      EditSubproductComponent,

      ConfigComponent,
      EditConfigComponent,

      SearchPipe,

    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
      UpgradeComponent
  ],
    providers: [],
})

export class AdminLayoutModule {}
