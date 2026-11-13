// Practica MongoDB: tienda de tecnologia. Datos simulados.
// Ejecutar en mongosh: load('tienda_tecnologia.mongodb.js')
// ATENCION: este script crea registros solo si las colecciones estan vacias.
const base = db.getSiblingDB('tienda_tecnologia');
for (const nombre of ['clientes', 'productos', 'pedidos']) {
  if (!base.getCollectionNames().includes(nombre)) base.createCollection(nombre);
}
const ciudades = ['Bogotá','Medellín','Cali','Barranquilla','Bucaramanga','Pereira'];
if (base.clientes.countDocuments({}) === 0) {
  const clientes = [];
  for (let i=1;i<=30;i++) clientes.push({cliente_id:i,nombre:'Cliente '+i,correo:'cliente'+i+'@correo.com',telefono:'300'+String(1000000+i),ciudad:ciudades[(i-1)%ciudades.length],fecha_registro:new Date()});
  base.clientes.insertMany(clientes);
}
const categorias = ['Computadores','Celulares','Accesorios','Impresoras','Almacenamiento'];
if (base.productos.countDocuments({}) === 0) {
  const productos=[];
  for(let i=1;i<=30;i++) productos.push({producto_id:i,nombre:'Producto tecnológico '+i,categoria:categorias[(i-1)%categorias.length],precio:50000+i*25000,stock:10+i,marca:'TechStore',disponible:true});
  base.productos.insertMany(productos);
}
const estados=['Pendiente','Enviado','Entregado','Cancelado'];
if (base.pedidos.countDocuments({}) === 0) {
  const pedidos=[];
  for(let i=1;i<=50;i++) { const productoId=((i-1)%30)+1, cantidad=(i%4)+1, precio=50000+productoId*25000;
    pedidos.push({pedido_id:i,cliente_id:((i-1)%30)+1,fecha:new Date(2026,9,(i%28)+1),productos:[{producto_id:productoId,cantidad,precio_unitario:precio}],total:cantidad*precio,estado:estados[(i-1)%estados.length]}); }
  base.pedidos.insertMany(pedidos);
}
print('Clientes:',base.clientes.countDocuments({}));
print('Productos:',base.productos.countDocuments({}));
print('Pedidos:',base.pedidos.countDocuments({}));
