import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../../shared/services/layout/theme.service';
import { Observable, Subject } from 'rxjs';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

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
    airline:string;

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
      public router: Router,
        private adalService:MsAdalAngular6Service
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
        //this.setThemes();
        if(this.adalService.isAuthenticated){
          this.userId = this.adalService.LoggedInUserName;
          this.logInName = this.getFirstName(this.adalService.LoggedInUserName)+' '+this.getLastName(this.adalService.LoggedInUserName,' ');
          this.loggedInEmail = this.adalService.LoggedInUserEmail;
        }
  }

  getFirstName = function (str) {
    var arr = str.split(' ');
    if (arr.length === 1) {
      return arr[0];
    }
    return this.capitalizeFirstLetter(arr.slice(0, -1).join(' ')); // returns "Paul Steve"
  }

 
  getLastName = function (str, ifNone) {
    var arr = str.split(' ');
    if (arr.length === 1) {
      return ifNone || "<None>";
    }
    return this.capitalizeFirstLetter(arr.slice(-1).join(' '));
  }
  capitalizeFirstLetter(string) {
    return string.replace(/^./, string[0].toUpperCase());
  }
     /*Method to get the themes list from the UiComponentsService and assign it to the themesList declared in this file.*/
     setThemes(): void {
        this.themeService.getThemesList().subscribe(data => {
            this.themesList = data;
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
    this.adalService.logout();
       // localStorage.removeItem('isLoggedin');
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
