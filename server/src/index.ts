import { WebSocketServer } from 'ws';
import { ApiResponse, ItemType, Location } from '../_shared';

const wss = new WebSocketServer({
  port: 3000,
});

wss.on('connection', ws => {
  ws.send(JSON.stringify(generate()));

  setInterval(() => {
    ws.send(JSON.stringify(generate()));
  }, 5000);
})

function generate(): ApiResponse {
  return {
    payload: [
      {
        id: '92051',
        type: ItemType.PERSON,
        name: 'Новиков М.К.',
        production: 'Сбойка-1',
        node: 'А1-23415',
        charge: 95,
        longitude: getRandomLocation(82.629043, 49.945725, 1000).longitude,
        latitude: getRandomLocation(82.629043, 49.945725, 1000).latitude,
        timestamp: Date.now(),
      },
      {
        id: '001823',
        type: ItemType.VEHICLE,
        name: 'DZ-1800',
        production: 'Сбойка-1',
        node: 'А1-23415',
        charge: 95,
        longitude: getRandomLocation(82.629043, 49.945725, 1000).longitude,
        latitude: getRandomLocation(82.629043, 49.945725, 1000).latitude,
        timestamp: Date.now(),
      },
      {
        id: '9384',
        type: ItemType.PERSON,
        name: 'Васильев Г.Д.',
        production: 'Вентиляционный штрек',
        node: 'А1-23416',
        charge: 40,
        longitude: getRandomLocation(82.629043, 49.945725, 1000).longitude,
        latitude: getRandomLocation(82.629043, 49.945725, 1000).latitude,
        timestamp: Date.now(),
      },
      {
        id: '002415',
        type: ItemType.VEHICLE,
        name: '2АМ8Д',
        production: 'Вентиляционный штрек',
        node: 'А1-23416',
        charge: 100,
        longitude: getRandomLocation(82.629043, 49.945725, 1000).longitude,
        latitude: getRandomLocation(82.629043, 49.945725, 1000).latitude,
        timestamp: Date.now(),
      }
    ],
    timestamp: Date.now(),
  }
}

function getRandomLocation(lat: number, long: number, rad: number): Location {
  const randomCoordinates = getRandomCoordinates(rad, true);

  // Earths radius in meters via WGS 84 model.
  const earth = 6378137;

  // Offsets in meters.
  const northOffset = randomCoordinates[0];
    const  eastOffset = randomCoordinates[1];
  // Offset coordinates in radians.
  const offsetLatitude = northOffset / earth;
  const  offsetLongitude = eastOffset / (earth * Math.cos(Math.PI * (lat / 180)));

  // Offset position in decimal degrees.
  return {
    latitude: Number((lat + (offsetLatitude * (180 / Math.PI))).toFixed(6)),
    longitude: Number((long + (offsetLongitude * (180 / Math.PI))).toFixed(6))
  }
}

function getRandomCoordinates(radius: number, uniform: boolean): number[] {
  // Generate two random numbers
  let a = Math.random();
  let b = Math.random();

  // Flip for more uniformity.
  if (uniform) {
    if (b < a) {
      const c = b;
      b = a;
      a = c;
    }
  }

  // It's all triangles.
  return [
    b * radius * Math.cos(2 * Math.PI * a / b),
    b * radius * Math.sin(2 * Math.PI * a / b)
  ];
}
