import {Routes} from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {ProductPageComponent} from './pages/product-page/product-page.component';
import {LayoutComponent} from './common-ui/layout/layout.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {canActivateAuth} from './auth/access_guard';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: MainPageComponent},
      {path: 'product/:id', component: ProductPageComponent},

      {path: 'profile', children: [
        {path: 'me', component: ProfilePageComponent},
        ],
        canActivate: [canActivateAuth]
      },
      {path: 'login', component: LoginPageComponent}
    ]
  },
];
