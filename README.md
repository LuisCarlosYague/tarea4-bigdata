# Tienda de tecnología: práctica de MongoDB

Proyecto académico de almacenamiento y consultas NoSQL en MongoDB. Los datos son **simulados**.

## Estructura

- `tienda_tecnologia.mongodb.js`: crea la base de datos y tres colecciones (`clientes`, `productos`, `pedidos`) e inserta 110 documentos si las colecciones están vacías.
- `consultas.mongodb.js`: ejecuta consultas de selección, filtros, actualización, eliminación de registro temporal, `$lookup` y agregaciones.

## Requisitos

MongoDB Server y MongoDB Shell (`mongosh`) instalados y conectados a `mongodb://localhost:27017`.

## Ejecución

Abrir `mongosh` en la carpeta del proyecto y ejecutar:

```javascript
load('tienda_tecnologia.mongodb.js')
load('consultas.mongodb.js')
```

También se puede copiar el contenido de cada archivo a la consola integrada de MongoDB Compass.

**Precaución:** si ya ejecutaste la práctica en tu equipo, no necesitas volver a cargar los datos. El archivo de consultas modifica el precio del producto 1 a 120000 y crea/elimina un producto temporal con `producto_id: 999`. El script de carga no reemplaza colecciones que ya contienen documentos.

## Resultados esperados con la carga original

- Clientes: 30; productos: 30; pedidos: 50.
- Pedidos: 13 pendientes, 13 enviados, 12 entregados y 12 cancelados.
- Ventas de pedidos entregados: 17.400.000.
- Precio promedio después de la actualización: 439.000.



