import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminVideosComponent } from "src/app/components/admin-components/admin-videos/admin-videos.component";
import { ContactMessagesComponent } from "src/app/components/admin-components/contact-messages/contact-messages.component";
import { UplatniceComponent } from "src/app/components/admin-components/uplatnice/uplatnice.component";
import { RoleGuard } from "src/app/shared/guard/role.guard";
import { AdminComponent } from "./admin.component";

const routes : Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [RoleGuard],
    children: [
      { path: 'uplatnice', component: UplatniceComponent },
      { path: 'videos', component: AdminVideosComponent },
      { path: 'messages', component: ContactMessagesComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule{

}
