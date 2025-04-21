import { NgModule } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [HeaderComponent, FooterComponent, HomeComponent],
    imports: [SharedModule, NgApexchartsModule, FormsModule],
    exports: [HeaderComponent, FooterComponent, HomeComponent]
})
export class CoreModule { }
