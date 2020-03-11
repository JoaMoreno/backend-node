URL: https://apirest.glitch.me/api

METHOD  | DESCRIPTION

GET       /products
          Devuelve todos los productos
        
POST      /products
          Se envia un JSON:
           {
              "name": " PRODUCT NAME"
              "description": " PRODUCT DESCRIPTION"
              "imgURL": " PRODUCT IMAGE"
           }
         
POST      /products/id
          Elimina el producto con el id que se paso, por ejemplo:
          https://backend-node.glitch.me/api/products/5e6972dd1dfefa04981e0ecb
