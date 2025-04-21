import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { CoreModule } from './core/core.module';
import { FeatureModule } from './pages/feature.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token.interceptor';



@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        CoreModule, FeatureModule
    ],
    providers: [
        provideHttpClient(withInterceptors([tokenInterceptor]))
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
