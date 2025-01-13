import {Routes} from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {ProductPageComponent} from './pages/product-page/product-page.component';
import {LayoutComponent} from './common-ui/layout/layout.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {canActivateAuth} from './auth/access_guard';
import {OrderComponent} from './common-ui/order/order.component';
import {CartComponent} from './common-ui/cart/cart.component';
import {OrderPageComponent} from './pages/order-page/order-page.component';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: MainPageComponent},
      {path: 'product/:id', component: ProductPageComponent},

      {path: 'me', children: [
        {path: 'profile', component: ProfilePageComponent},
        {path: 'order/:id', component: OrderPageComponent},
        {path: 'cart', component: CartComponent},
        ],
        canActivate: [canActivateAuth]
      },
      {path: 'login', component: LoginPageComponent}
    ]
  },
];
