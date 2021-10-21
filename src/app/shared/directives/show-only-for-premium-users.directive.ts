import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[showOnlyForPremiumUsers]',
})
export class ShowOnlyForPremiumUsersDirective {
  @Input('showOnlyForPremiumUsers') condition: boolean;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthService  ) {
      this.authService.premiumStatusChanged.subscribe((statusChanged) => {
        if(statusChanged){
          console.log('statusChanged')
          this.checkIsPremiumUserAndShowOrHideTemplate();
        }
      })
    }

  ngOnInit() {
    this.checkIsPremiumUserAndShowOrHideTemplate();
  }

  checkIsPremiumUserAndShowOrHideTemplate(){
    if(this.authService.isLoggedIn && this.authService.isPremiumUser){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      console.log('createEmbeddedView')
    }
     else {
      this.viewContainerRef.clear();
    }
  }
}
