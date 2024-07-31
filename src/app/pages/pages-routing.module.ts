import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { SMEDComponent } from '../@theme/components/smed/smed.component';
import { ProjectListComponent } from '../@theme/components/project-list/project-list.component';
import { NewProjectSMEDComponent } from '../@theme/components/new-project-smed/new-project-smed.component';
import { ShowProjectComponent } from '../@theme/components/show-project/show-project.component';
import { NewTutoComponent } from '../@theme/components/new-tuto/new-tuto.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'lean/smed',
      component: SMEDComponent,
      data: {
        title: 'SMED (Single-Minute Exchange of Die)',
      },
    },
    {
      path: 'lean/smed/list',
      component: ProjectListComponent,
      data: {
        title: 'SMED Projects List',
      },
    },
    {
      path: 'lean/smed/new',
      component: NewProjectSMEDComponent,
      data: {
        title: 'New SMED Project',
      },
    },
    {
      path: 'lean/smed/show/:id',
      component: ShowProjectComponent,
      data: {
        title: 'Show SMED Project'
      },
    },
    {
      path: 'lean/smed/newtuto',
      component: NewTutoComponent,
      data: {
        title: 'Show SMED Project'
      },
    },
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module').then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module').then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module').then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module').then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module').then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
