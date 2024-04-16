import { Application, Router } from 'express'
import { HealthRouter } from './health.routes'
import { UserRouter } from './user.routes'
import { ProgamAcaraRouter } from './progam-acara.routes'
import { GaleriImageRouter } from './galeri.routes'
import { KabarBeritaRouter } from './kabar-berita.routes'
import { JadwalAcaraRouter } from './jadwal.routes'

const _routes: Array<[string, Router]> = [
  ['/v1/api/', HealthRouter],
  ['/v1/api/auth', UserRouter],
  ['/v1/api/progam-acara', ProgamAcaraRouter],
  ['/v1/api/galeri-image', GaleriImageRouter],
  ['/v1/api/kabar-berita', KabarBeritaRouter],
  ['/v1/api/jadwal-acara', JadwalAcaraRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
