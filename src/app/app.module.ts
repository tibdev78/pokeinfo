import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule, NativeScriptFormsModule } from "@nativescript/angular";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PokeComponent } from './components/poke/poke.component';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { TNSFontIconModule, TNSFontIconService, USE_STORE } from 'nativescript-ngx-fonticon';
import { DialogFilterComponent } from './components/dialog/dialog-filter/dialog-filter.component';
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';
import { ImageCacheViewComponent } from './components/custom/image-cache-view/image-cache-view.component';
import { TNSImageCacheItModule } from 'nativescript-image-cache-it/angular';
import { PokeDetailsComponent } from './components/poke/poke-details/poke-details.component';
// import { NativeScriptFormsModule } from "nativescript-angular/forms";
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
TNSFontIconService.debug = true;

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        TNSFontIconModule.forRoot({
            'fa': require("./assets/css/font-awesome.css"),
        }),
        AppRoutingModule,
        ReactiveFormsModule,
        TNSCheckBoxModule,
        TNSImageCacheItModule
    ],
    declarations: [
        AppComponent,
        PokeComponent,
        DialogFilterComponent,
        ImageCacheViewComponent,
        PokeDetailsComponent
    ],
    providers: [
        {
            provide: USE_STORE,
            useValue: {
                fa: require("./assets/css/font-awesome.css"),
            }
        }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [DialogFilterComponent, ImageCacheViewComponent]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
