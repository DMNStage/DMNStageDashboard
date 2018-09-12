import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditConfigComponent} from './edit-config.component';

describe('EditConfigComponent', () => {
    let component: EditConfigComponent;
    let fixture: ComponentFixture<EditConfigComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditConfigComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
