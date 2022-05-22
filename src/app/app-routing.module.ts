import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServiceComponent } from './service/service.component';

const routes: Routes = [
  { path:'home', component: HomeComponent},
  { path:'service', component: ServiceComponent},
  { path:'projects', component: ProjectsComponent},
  { path:'about-us', component: AboutUsComponent},
  { path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
