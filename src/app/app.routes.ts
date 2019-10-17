import { Routes } from '@angular/router';
import { RegisterComponent } from './shared/auth/register/register.component'
import { LoginComponent } from './shared/auth/login/login.component'
import { ResetComponent } from './shared/auth/reset/reset.component';
import { AuthGuard } from './shared/guard/auth.guard';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudensComponent } from './pages/studens/studens.component';
import { DinningComponent } from './pages/dinning/dinning.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { UsersComponent } from './pages/users/users.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { GroupAdminComponent } from './pages/group-admin/group-admin.component';
import { ViewGroupAComponent } from './pages/group-admin/view-group-a/view-group-a.component'

export const ROUTES: Routes = 
[

    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'studen', component: StudensComponent, canActivate: [AuthGuard] },
    { path: 'studens', component: StudensComponent, canActivate: [AuthGuard] },
    
    { path: 'dinning_room', component: DinningComponent, canActivate: [AuthGuard] },
    { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
    { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },

    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'teachers', component: TeacherComponent, canActivate: [AuthGuard] },
    { path: 'group_admin', component: GroupAdminComponent, canActivate: [AuthGuard] },
    { path: 'group/:type/:id', component: ViewGroupAComponent, canActivate: [AuthGuard] },

    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'password_reset', component: ResetComponent},
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }

]