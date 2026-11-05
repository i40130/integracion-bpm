// Service worker: copia local de la app para abrirla sin conexión. Versión 2026-11-05.2
const CACHE='integracion-bpm-2026-11-05.2';const PRECACHE=["./", "index.html", "manifest.webmanifest", "assets/bpmn-js.css", "assets/bpmn-navigated-viewer.production.min.js", "assets/icon-192.png", "assets/icon-512.png", "reto-ibericos/", "reto-ibericos/index.html", "a1/A1_Enunciado_Bases_de_la_integracion.pdf", "a1/A1_Caso_Calorvia.pdf", "a1/A1_Plantilla_entrega.xlsx", "a1/A1_AsIs_Calorvia.bpmn", "a1/A1_AsIs_Calorvia.svg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!e.request.url.startsWith(self.location.origin))return;
 e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));});
