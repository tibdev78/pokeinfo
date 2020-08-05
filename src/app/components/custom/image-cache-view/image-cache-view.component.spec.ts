import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCacheViewComponent } from './image-cache-view.component';

describe('ImageCacheViewComponent', () => {
  let component: ImageCacheViewComponent;
  let fixture: ComponentFixture<ImageCacheViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCacheViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCacheViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
