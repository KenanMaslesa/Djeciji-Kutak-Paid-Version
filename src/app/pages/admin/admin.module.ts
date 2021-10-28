import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminVideosComponent } from 'src/app/components/admin-components/admin-videos/admin-videos.component';
import { ContactMessagesComponent } from 'src/app/components/admin-components/contact-messages/contact-messages.component';
import { UplatniceComponent } from 'src/app/components/admin-components/uplatnice/uplatnice.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [
    AdminComponent,
    ContactMessagesComponent,
    AdminVideosComponent,
    UplatniceComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    FormsModule,
    AdminRoutingModule
  ],
  providers: [],
})
export class AdminModule { }
