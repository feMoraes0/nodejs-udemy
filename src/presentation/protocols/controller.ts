import { HttpResponse, HttpRquest } from './http'

export interface Controller {
  handle: (httpRequest: HttpRquest) => Promise<HttpResponse>
}
