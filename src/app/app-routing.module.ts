import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { PokeComponent } from "./components/poke/poke.component";
import { PokeDetailsComponent } from "./components/poke/poke-details/poke-details.component";

const routes: Routes = [
    { path: "", redirectTo: "/poke", pathMatch: "full" },
    { path: "poke", component: PokeComponent },
    { path: "poke/:id", component: PokeDetailsComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
