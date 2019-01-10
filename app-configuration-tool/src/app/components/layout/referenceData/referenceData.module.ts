import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import {ReferenceDataComponent} from './reference-data.component';
import { ReferenceDataRoutingModule,routingComponents } from './referenceData-routing.module';
import { DashboardModule} from '../dashboard/dashboard.module';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        ReferenceDataRoutingModule,
        DashboardModule
        
    ],
    declarations: [
        ReferenceDataComponent,
        routingComponents
        
    ]
})
export class ReferenceDataModule {}
