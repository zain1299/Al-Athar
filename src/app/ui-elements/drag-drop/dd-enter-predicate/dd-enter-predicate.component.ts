import { Component } from '@angular/core';
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
    CdkDrag,
    CdkDropList,
} from '@angular/cdk/drag-drop';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-dd-enter-predicate',
    standalone: true,
    imports: [CdkDropList, CdkDrag],
    templateUrl: './dd-enter-predicate.component.html',
    styleUrl: './dd-enter-predicate.component.scss'
})
export class DdEnterPredicateComponent {

    all = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    even = [10];

    drop(event: CdkDragDrop<number[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

    /** Predicate function that only allows even numbers to be dropped into a list. */
    evenPredicate(item: CdkDrag<number>) {
        return item.data % 2 === 0;
    }

    /** Predicate function that doesn't allow items to be dropped into a list. */
    noReturnPredicate() {
        return false;
    }

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

}