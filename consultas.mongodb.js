// Consultas de la practica. Ejecutar en mongosh: load('consultas.mongodb.js')
const base = db.getSiblingDB('tienda_tecnologia');
print('\n1. Primeros clientes'); printjson(base.clientes.find().limit(5).toArray());
print('\n2. Primeros productos'); printjson(base.productos.find().limit(5).toArray());
print('\n3. Pedidos entregados'); printjson(base.pedidos.find({estado:'Entregado'}).limit(5).toArray());
print('\n4. Productos con precio > 500000'); printjson(base.productos.find({precio:{$gt:500000}}).toArray());
print('\n5. Actualizacion del producto 1'); printjson(base.productos.updateOne({producto_id:1},{$set:{precio:120000}})); printjson(base.productos.findOne({producto_id:1}));
print('\n6. Insercion y eliminacion temporal');
if (!base.productos.findOne({producto_id:999})) printjson(base.productos.insertOne({producto_id:999,nombre:'Producto temporal',categoria:'Prueba',precio:10000,stock:1}));
printjson(base.productos.deleteOne({producto_id:999})); printjson(base.productos.findOne({producto_id:999}));
print('\n7. Join de pedidos y clientes');
printjson(base.pedidos.aggregate([{$lookup:{from:'clientes',localField:'cliente_id',foreignField:'cliente_id',as:'datos_cliente'}},{$unwind:'$datos_cliente'},{$project:{_id:0,pedido_id:1,cliente:'$datos_cliente.nombre',ciudad:'$datos_cliente.ciudad',total:1,estado:1}},{$limit:10}]).toArray());
print('\n8. Pedidos por estado'); printjson(base.pedidos.aggregate([{$group:{_id:'$estado',cantidad_pedidos:{$sum:1}}},{$sort:{cantidad_pedidos:-1}}]).toArray());
print('\n9. Total ventas entregadas'); printjson(base.pedidos.aggregate([{$match:{estado:'Entregado'}},{$group:{_id:null,total_ventas:{$sum:'$total'},pedidos_entregados:{$sum:1}}},{$project:{_id:0,total_ventas:1,pedidos_entregados:1}}]).toArray());
print('\n10. Estadisticas de precios'); printjson(base.productos.aggregate([{$group:{_id:null,precio_promedio:{$avg:'$precio'},precio_maximo:{$max:'$precio'},precio_minimo:{$min:'$precio'},total_productos:{$sum:1}}}]).toArray());
print('\n11. Productos por categoria'); printjson(base.productos.aggregate([{$group:{_id:'$categoria',cantidad:{$sum:1},precio_promedio:{$avg:'$precio'},stock_total:{$sum:'$stock'}}},{$sort:{_id:1}}]).toArray());
