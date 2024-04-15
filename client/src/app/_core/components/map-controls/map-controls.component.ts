import { ChangeDetectionStrategy, Component, HostBinding, inject, ViewEncapsulation } from '@angular/core';
import { OlService } from '#core/services';

@Component({
  standalone: true,
  selector: 'mp-map-controls',
  templateUrl: 'map-controls.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MapControlsComponent {
  @HostBinding() class = 'mp-map-controls';

  private readonly olService = inject(OlService);
  private readonly zoomStep = 0.5;

  increaseZoom() {
    const currentZoom = this.olService.map.getView().getZoom();
    this.olService.map.getView().setZoom(currentZoom + this.zoomStep);
  }

  desreaseZoom() {
    const currentZoom = this.olService.map.getView().getZoom();
    this.olService.map.getView().setZoom(currentZoom - this.zoomStep);
  }
}
