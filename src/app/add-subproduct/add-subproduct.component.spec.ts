import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddSubproductComponent} from './add-subproduct.component';

describe('AddSubproductComponent', () => {
    let component: AddSubproductComponent;
    let fixture: ComponentFixture<AddSubproductComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddSubproductComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddSubproductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
