import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReferenceDataComponent } from "./reference-data.component";
import { LocationComponent } from "./components/location/location.component";
import { CapabilitiesComponent } from "./components/capabilities/capabilities.component";

const routesNew: Routes = [
  {
    path: '',
    component: ReferenceDataComponent},  
      
      { path: 'location', component: LocationComponent },
      { path: 'capabilities', component: CapabilitiesComponent }
];



@NgModule({
  imports: [RouterModule.forChild(routesNew)],
  exports: [RouterModule]
})
export class ReferenceDataRoutingModule {}
export const routingComponents = [LocationComponent, CapabilitiesComponent];
