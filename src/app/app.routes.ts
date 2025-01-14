import {Routes} from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {ProductPageComponent} from './pages/product-page/product-page.component';
import {LayoutComponent} from './common-ui/layout/layout.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {canActivateAuth, isAdmin} from './auth/access_guard';
import {CartComponent} from './common-ui/cart/cart.component';
import {OrderPageComponent} from './pages/order-page/order-page.component';
import {AdminPageComponent} from './common-ui/admin-page/admin-page.component';
import {FilteredProductsComponent} from './common-ui/filtered-products/filtered-products.component';
import {ForecastComponent} from './common-ui/admin/forecast/forecast.component';
import {UserPanelComponent} from './common-ui/admin/user-panel/user-panel.component';
import {AdminPanelComponent} from './common-ui/admin-panel/admin-panel.component';
import {CategoryPanelComponent} from './common-ui/admin/category-panel/category-panel.component';
import {ManufacturerPanelComponent} from './common-ui/admin/manufacturer-panel/manufacturer-panel.component';

export const routes: Routes = [
    {
      path: '', component: LayoutComponent, children: [
        {path: '', component: MainPageComponent},
        {path: 'product/:id', component: ProductPageComponent},
        {path: 'category/:title', component: FilteredProductsComponent},
        {
          path: 'me', children: [
            {path: 'profile', component: ProfilePageComponent},
            {path: 'order/:id', component: OrderPageComponent},
            {path: 'cart', component: CartComponent},
          ],
          canActivate: [canActivateAuth]
        },
        {path: 'login', component: LoginPageComponent}
      ]
    },
    {
      path: 'admin', children: [
        {
          path: '', component: AdminPageComponent, children: [
            {path: '', component: AdminPanelComponent},
            {path: 'category', component: CategoryPanelComponent},
            {path: 'manufacturer', component: ManufacturerPanelComponent},
            {path: 'users', component: UserPanelComponent},
          ]
        },
        {path: 'forecast', component: ForecastComponent}
      ], canActivate: [canActivateAuth, isAdmin]
    },
  ]
;
