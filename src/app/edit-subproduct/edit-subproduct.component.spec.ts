import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditSubproductComponent} from './edit-subproduct.component';

describe('EditSubproductComponent', () => {
    let component: EditSubproductComponent;
    let fixture: ComponentFixture<EditSubproductComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditSubproductComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditSubproductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
