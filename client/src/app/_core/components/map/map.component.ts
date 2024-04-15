import { Component, inject, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { Store } from '@ngrx/store';
import { getItems, ItemsActions } from '#store/items';
import { Point } from 'ol/geom';
import { fromLonLat, transform } from 'ol/proj';
import { Feature } from 'ol';
import { Icon, Style } from 'ol/style';
import { Vector as LayerVector } from 'ol/layer';
import { Vector as SourceVector } from 'ol/source';
import { Item, ItemType, SafeAny } from '#core/interfaces';
import VectorSource from 'ol/source/Vector';
import { filter, map } from 'rxjs';
import { isDefined } from '#core/utils';
import { Modify } from 'ol/interaction';
import { Control, defaults as defaultControls } from 'ol/control';
import { OlService } from '#core/services';

@Component({
  standalone: true,
  selector: 'mp-map',
  templateUrl: 'map.component.html'
})
export class MapComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly items$ = this.store.select(getItems);
  private readonly olService = inject(OlService);

  ngOnInit(): void {
    this.initMap();
    this.handleItemsUpdate();
    this.handleMapClick();
  }

  private initMap(): void {
    const layers = [
      new TileLayer({
        source: new OSM(),
      }),
      new LayerVector({
        className: 'mp-items',
        source: new VectorSource({ features: [] })
      })
    ];
    const view = new View();
    view.setCenter(fromLonLat([82.629043, 49.945725]))
    view.setZoom(12);

    this.olService.map = new Map({
      target: 'map',
      controls: defaultControls({ attribution: false }),
      layers,
      view,
    });
  }

  private handleItemsUpdate() {
    const layer = this.olService.map.getLayers().getArray().find(layer => layer.getClassName() == 'mp-items') as LayerVector<SafeAny>;
    const source = layer.getSource() as SourceVector;

    this.items$.pipe(filter(isDefined)).subscribe(items => {
      for (const item of items) {
        const itemId = `mp-item-${item.id}`;
        const feature = source.getFeatureById(itemId);
        const geometry = new Point(fromLonLat([item.latitude, item.longitude]));

        if(isDefined(feature)) {
          feature.setGeometry(geometry);
          this.scaleIconSize(feature, item.isChecked ? 1.5 : 1);
        } else {
          const newFeature = new Feature();
          const style = new Style({
            image: new Icon({
              src: `assets/images/marker-${item.type === ItemType.PERSON ? 'person' : 'vehicle'}.svg`,
              anchor: [0.5, 1],
              scale: item.isChecked ? 1.5 : 1,
            })
          })
          newFeature.setStyle(style);
          newFeature.setGeometry(geometry);
          newFeature.setId(itemId);
          source.addFeature(newFeature);
        }
      }
    })
  }

  private handleMapClick() {
    this.olService.map.on('click', e => {
      const layer = this.olService.map.getLayers().getArray().find(layer => layer.getClassName() == 'mp-items') as LayerVector<SafeAny>;
      const source = layer.getSource() as SourceVector;
      const feature = this.olService.map.forEachFeatureAtPixel(e.pixel, f => f) as Feature;
      this.store.dispatch(ItemsActions.uncheckAll());
      const items = this.store.selectSignal(getItems);
      const item = items().find(i => i.id === feature.getId().toString().replace('mp-item-', ''));
      this.store.dispatch(ItemsActions.updateItem({ item: { ...item, isChecked: true } }));

      if (isDefined(feature)) {
        this.scaleIconSize(feature, 1.5);
      }
    })
  }

  private scaleIconSize(feature: Feature, scale: number): void {
    const layer = this.olService.map.getLayers().getArray().find(layer => layer.getClassName() == 'mp-items') as LayerVector<SafeAny>;
    const style = feature.getStyle() as Style;
    const icon = style.getImage() as Icon;
    icon.setScale(scale);
    layer.changed();
  }
}
