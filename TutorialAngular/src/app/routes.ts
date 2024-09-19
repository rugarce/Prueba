import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
import { CreateComponent } from './create/create.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page',
    },
    {
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Home details',
    },
    {
      path: 'create',
      component: CreateComponent,
      title: 'New home'
    }
  ];
  export default routeConfig;