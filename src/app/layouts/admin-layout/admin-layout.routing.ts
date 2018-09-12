import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
import {AdminsComponent} from '../../admins/admins.component';
import {ClientsComponent} from '../../clients/clients.component';
import {ProductsComponent} from '../../products/products.component';
import {AddClientComponent} from '../../add-client/add-client.component';
import {EditClientComponent} from '../../edit-client/edit-client.component';
import {AddAdminComponent} from '../../add-admin/add-admin.component';
import {EditAdminComponent} from '../../edit-admin/edit-admin.component';
import {ConfigComponent} from '../../config/config.component';
import {AuthGuard} from '../../../services/auth/auth.guard';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    {path: 'admins', component: AdminsComponent, canActivate: [AuthGuard]},
    {path: 'newadmin', component: AddAdminComponent, canActivate: [AuthGuard]},
    {path: 'editadmin/:id', component: EditAdminComponent, canActivate: [AuthGuard]},
    {path: 'clients', component: ClientsComponent, canActivate: [AuthGuard]},
    {path: 'newclient', component: AddClientComponent, canActivate: [AuthGuard]},
    {path: 'editclient/:id', component: EditClientComponent, canActivate: [AuthGuard]},
    {path: 'produits', component: ProductsComponent, canActivate: [AuthGuard]},
    {path: 'config', component: ConfigComponent, canActivate: [AuthGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
