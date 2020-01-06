import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestComponentsPage } from './test-components.page';

describe('TestComponentsPage', () => {
  let component: TestComponentsPage;
  let fixture: ComponentFixture<TestComponentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
