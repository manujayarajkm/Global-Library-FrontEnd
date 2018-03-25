import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Http,XHRBackend, RequestOptions} from '@angular/http';
import {CookieModule} from 'ngx-cookie';
import { DatePipe } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import{BarRatingModule} from 'ngx-bar-rating';
import { RatingModule } from 'ngx-bootstrap/rating';
import { RouterLinkActive } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import {NgsRevealModule} from 'ng-scrollreveal';
import { StorageServiceModule} from 'angular-webstorage-service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { MomentModule } from 'angular2-moment';
import { NgProgressModule } from 'ngx-progressbar';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AlertModule } from 'ngx-bootstrap/alert';
import { Ng4FilesModule } from 'angular4-files-upload';
import * as $ from 'jquery';



import { AppComponent } from './app.component';
import { LibraryLaunchComponent } from './library-launch/library-launch.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AllBooksComponent } from './all-books/all-books.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { MyQueueComponent } from './my-queue/my-queue.component';
import { MyHistoryComponent } from './my-history/my-history.component';
import { HiresComponent } from './hires/hires.component';
import { AllMembersComponent } from './all-members/all-members.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { ForTestingComponent } from './for-testing/for-testing.component';
import { AboutComponent } from './about/about.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AcknowledgedComponent } from './acknowledged/acknowledged.component';
import { ReviewComponent } from './review/review.component';
import { BorrowalComponent } from './borrowal/borrowal.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { StoreComponent } from './store/store.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { BillingComponent } from './billing/billing.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { DeepSearchComponent } from './deep-search/deep-search.component';
import { ForcheckDirective } from './forcheck.directive';
import { LoginService } from './login.service';
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';
import { UtilService } from './util.service';
import { SortByPipe } from './sort-by.pipe';
import { AdminGuard } from './admin.guard';
import { AdminService } from './admin.service';
import { BootstrapTestComponent } from './bootstrap-test/bootstrap-test.component';
import { LogoutService } from './logout.service';
import { SessionService } from './session.service';
import { CustomhttpService } from './customhttp.service';
import{ErrorNotifierService} from './error.notifier.service'
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes=[
  {path:'',component:LibraryLaunchComponent},
  {path:'userhome',
  canActivate:[AuthGuard],
  component:UserHomeComponent},
  {path:'allBooks',
  canActivate:[AuthGuard],
  component:AllBooksComponent},
  {path:'adminhome',
  canActivate:[AdminGuard],
  component:AdminHomeComponent},
  {path:'myQueue',
  canActivate:[AuthGuard],
  component:MyQueueComponent},
  {path:'myHistory',
  canActivate:[AuthGuard],
  component:MyHistoryComponent},
  {path:'hires',
  canActivate:[AdminGuard],
  component:HiresComponent},
  {path:'allMembers',
  canActivate:[AdminGuard],
  component:AllMembersComponent},
  {path:'viewBooks',
  canActivate:[AdminGuard],
  component:ViewBookComponent},
  {path:'imagetest',component:ForTestingComponent},
  {path:'about',component:AboutComponent},
  {path:'test',component:ForTestingComponent},
  {path:'notifications',
  canActivate:[AuthGuard],
  component:NotificationsComponent},
  {path:'acknowledged',
  canActivate:[AuthGuard],
  component:AcknowledgedComponent},
  {path:'review',
  canActivate:[AuthGuard],
  component:ReviewComponent},
  {path:'borrowal',
  canActivate:[AuthGuard],
  component:BorrowalComponent},
  {path:'passwordReset',component:PasswordResetComponent},
  {path:'changepassword',
  canActivate:[AuthGuard],
  component:ChangepasswordComponent},
  {path:'updateprofile',
  canActivate:[AuthGuard],
  component:ProfileUpdateComponent},
  {path:'newpassword',component:NewPasswordComponent},
  {path:'store',
  canActivate:[AuthGuard],
  component:StoreComponent},
  {path:'cart',
  canActivate:[AuthGuard],
  component:CartComponent},
  {path:'payment',
  canActivate:[AuthGuard],
  component:PaymentComponent},
  {path:'billing',
  canActivate:[AuthGuard],
  component:BillingComponent},
  {path:'purchasehistory',
  canActivate:[AuthGuard],
  component:PurchaseHistoryComponent},
  {path:'deepsearch',component:DeepSearchComponent},
  {path:'bootstrap',component:BootstrapTestComponent},
  {path:'**',component:ErrorComponent}


];
export function httpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions, errorNotifier: ErrorNotifierService){
  return new CustomhttpService(backend, defaultOptions, errorNotifier);
}


@NgModule({
  declarations: [
    AppComponent,
    LibraryLaunchComponent,
    NavComponent,
    FooterComponent,
    UserHomeComponent,
    AllBooksComponent,
    AdminHomeComponent,
    MyQueueComponent,
    MyHistoryComponent,
    HiresComponent,
    AllMembersComponent,
    ViewBookComponent,
    ForTestingComponent,
    AboutComponent,
    NotificationsComponent,
    AcknowledgedComponent,
    ReviewComponent,
    BorrowalComponent,
    PasswordResetComponent,
    ChangepasswordComponent,
    ProfileUpdateComponent,
    NewPasswordComponent,
    StoreComponent,
    CartComponent,
    PaymentComponent,
    BillingComponent,
    PurchaseHistoryComponent,
    DeepSearchComponent,
    ForcheckDirective,
    ErrorComponent,
    SortByPipe,
    BootstrapTestComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CookieModule.forRoot(),
    DataTablesModule,
    BarRatingModule,
    RatingModule.forRoot(),
    ModalModule.forRoot(),
    NgsRevealModule.forRoot(),
    StorageServiceModule,
    PaginationModule.forRoot(),
    NgxPaginationModule,
    MomentModule,
    HttpClientModule,
    NgProgressModule,
    TypeaheadModule.forRoot(),
    AlertModule.forRoot(),
    Ng4FilesModule

  ],
  
  providers: [DatePipe, LoginService, AuthGuard, UtilService,SortByPipe, AdminGuard, AdminService, LogoutService, SessionService
,    ErrorNotifierService,
{
  provide: CustomhttpService,
  useFactory: httpServiceFactory,
  deps: [ XHRBackend, RequestOptions, ErrorNotifierService ]
  }
  
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
