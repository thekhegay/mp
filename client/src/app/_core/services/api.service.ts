import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { ApiResponse } from '#core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public readonly ws = webSocket<ApiResponse>('ws://localhost:3000');
}
