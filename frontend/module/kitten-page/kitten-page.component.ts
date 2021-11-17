import {Component, OnInit} from '@angular/core';
import {I18nService} from 'core-app/core/i18n/i18n.service';

@Component({
    templateUrl: './kitten-page.component.html',
    styleUrls: ['./kitten-page.component.sass'],
})
export class KittenPageComponent implements OnInit {

    text = {
        kittens: this.I18n.t('js.proto_plugin_name')
    };

    kittenName = 'FooBar';

    constructor(private I18n:I18nService) {
    }

    ngOnInit():void {
    }
}
