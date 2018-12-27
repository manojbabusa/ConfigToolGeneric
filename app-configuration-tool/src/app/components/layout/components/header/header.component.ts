import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../../shared/services/layout/theme.service';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    //User Details
    userId: string;
    logInName: string;
    loggedInEmail: string;
    isAdmin: boolean;
    icon: string;

    /*Theme Variables*/
    theme_id: string;
    themeID: string;
    themeName: string;
    colours: any[] = [];
    themesList: Observable<any>;
    themeChange = new Subject<string>();

    pushRightClass: string = 'push-right';

    constructor(
        private translate: TranslateService,
        private themeService : ThemeService,
        public router: Router
    ) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.setThemes();
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser){
            this.userId = currentUser.userId;
            this.logInName = currentUser.logInName;
            this.loggedInEmail = currentUser.email;
            this.isAdmin = currentUser.isAdmin;
            this.icon = currentUser.icon;
        }
    }
    
     /*Method to get the themes list from the UiComponentsService and assign it to the themesList declared in this file.*/
     setThemes(): void {
        this.themeService.getThemesList().subscribe(data => {
            this.themesList = data;
            //this.themeService.getInitalTheme("59897ca6a17fd4c3b9ca057f").subscribe(data => {
            const theme = data[0];
            this.themeName = theme.name;
        });
    }

    /*Method to set the selected theme*/
    setSelectedTheme(theme): void {
        this.theme_id = theme._id
        this.themeID = theme.themeID;
        this.themeName = theme.name;
        this.colours = theme.colours;
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    base64Image(base64PlusExtensionType: string): string {
        let decodedImage = "";
        if (base64PlusExtensionType) {
            const base64 = base64PlusExtensionType.split(".")[0];
            const extensionType = base64PlusExtensionType.split(".")[1];
            decodedImage = "data:image/" + extensionType + "+xml;base64, " + base64;
        }
        return decodedImage;
    };
}
