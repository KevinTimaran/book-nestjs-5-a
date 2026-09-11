import { Controller, Param, Get, Post, Body, Delete } from '@nestjs/common';

export interface Producto {
    id: string;
    name: string;
    category: string;
    vencimiento: boolean;
    cantidad: number;
}

@Controller('productos')
export class ProductosController {
        private productos: Producto[] = [
            // Lácteos
            { id: "1", name: "Leche", category: "Lácteos", vencimiento: true, cantidad: 10 },
            { id: "2", name: "Queso Mozzarella", category: "Lácteos", vencimiento: true, cantidad: 8 },
            { id: "3", name: "Yogurt Natural", category: "Lácteos", vencimiento: true, cantidad: 0 },

            // Panadería
            { id: "4", name: "Pan de Molde", category: "Panadería", vencimiento: true, cantidad: 5 },
            { id: "5", name: "Croissant", category: "Panadería", vencimiento: true, cantidad: 12 },
            { id: "6", name: "Galletas Integrales", category: "Panadería", vencimiento: false, cantidad: 0 },

            // Frutas
            { id: "7", name: "Manzanas Rojas", category: "Frutas", vencimiento: true, cantidad: 20 },
            { id: "8", name: "Bananos", category: "Frutas", vencimiento: true, cantidad: 15 },
            { id: "9", name: "Naranjas", category: "Frutas", vencimiento: true, cantidad: 0 },

            // Granos
            { id: "10", name: "Arroz Blanco", category: "Granos", vencimiento: false, cantidad: 50 },
            { id: "11", name: "Lentejas", category: "Granos", vencimiento: false, cantidad: 40 },
            { id: "12", name: "Frijoles Negros", category: "Granos", vencimiento: false, cantidad: 0 },

            // Aceites
            { id: "13", name: "Aceite de Oliva", category: "Aceites", vencimiento: false, cantidad: 0 },
            { id: "14", name: "Aceite de Girasol", category: "Aceites", vencimiento: false, cantidad: 18 },
            { id: "15", name: "Aceite de Coco", category: "Aceites", vencimiento: false, cantidad: 6 },

            // Carnes
            { id: "16", name: "Pechuga de Pollo", category: "Carnes", vencimiento: true, cantidad: 15 },
            { id: "17", name: "Carne Molida de Res", category: "Carnes", vencimiento: true, cantidad: 10 },
            { id: "18", name: "Lomo de Cerdo", category: "Carnes", vencimiento: true, cantidad: 0 },

            // Enlatados
            { id: "19", name: "Atún en Lata", category: "Enlatados", vencimiento: false, cantidad: 30 },
            { id: "20", name: "Maíz Dulce en Lata", category: "Enlatados", vencimiento: false, cantidad: 22 },
            { id: "21", name: "Sardinas en Tomate", category: "Enlatados", vencimiento: false, cantidad: 0 },

            // Bebidas
            { id: "22", name: "Café Molido", category: "Bebidas", vencimiento: false, cantidad: 0 },
            { id: "23", name: "Jugo de Naranja", category: "Bebidas", vencimiento: true, cantidad: 14 },
            { id: "24", name: "Agua Mineral", category: "Bebidas", vencimiento: false, cantidad: 60 }
        ];


        //Listar profuctos por categoria
    @Get(":categoria")
    getProductoByCategoria(){
        const bebidas: Producto[] = [];
        const lacteos: Producto[] = [];
        const panaderia: Producto[] = [];
        const frutas: Producto[] = [];
        const granos: Producto[] = [];
        const aceites: Producto[] = [];
        const carnes: Producto[] = [];
        const enlatados: Producto[] = [];
            for (const producto of this.productos) {
                if (producto.category === "Bebidas") {
                    bebidas.push(producto);
                } else if (producto.category === "Lácteos") {
                    lacteos.push(producto);
                } else if (producto.category === "Panadería") {
                    panaderia.push(producto);
                } else if (producto.category === "Frutas") {
                    frutas.push(producto);
                } else if (producto.category === "Granos") {
                    granos.push(producto);
                } else if (producto.category === "Aceites") {
                    aceites.push(producto);
                } else if (producto.category === "Carnes") {
                    carnes.push(producto);
                } else if (producto.category === "Enlatados") {
                    enlatados.push(producto);
                }
            }
        
        return {
            "Esta son las bebidas": bebidas,
            "Esta son los lácteos": lacteos,
            "Esta es la panadería": panaderia,
            "Esta son las frutas": frutas,
            "Esta son los granos": granos,
            "Esta son los aceites": aceites,
            "Esta son las carnes": carnes,
            "Esta son los enlatados": enlatados
        };
    }

    //Punto A: Listar Productos
    @Get()
    getProducto() {
        return this.productos;
    }

        //Punto D: Buscar Producto por vencimiento
    @Get(":vencimiento")
    getProductoByVencimiento(){
        const data = this.productos.filter((productos)=> productos.vencimiento === false);
        return data;
    }


    //Punto C : Listar sin Stok
    @Get("sin-stock")
    getProductoSinStock() {
        const data = this.productos.filter(productos => productos.cantidad === 0);
        return data;
    }

    //Punto B: Buscar Producto por ID
    @Get(":id")
    getProductoById(@Param('id') id: string) {
        console.log('.:: Producto ID: ', id)
        const data = this.productos.find((productos) => productos.id === id);
        console.log('.:: Producto buscado: ', data)
        return data;
    }

    //Punto E: Crear Producto
    @Post()
    createProducto(@Body() crearProducto: Producto) {
        console.log('.:: producto: ', crearProducto);

        const data = this.productos.find((productos) => productos.id === crearProducto.id);
        if (data){
            return {
                msg: "Producto ya existe",
                data: data
            };

            this.productos.push(crearProducto);
            return {
                msg: "Producto creado correctamente",
                data: crearProducto
            };
        }
    }

    // Eliminar un producto con la Id de este mismo
    @Delete(':id')
    deleteProduto(@Param('id:') id: string) {
        console.log(',:: peoducto ID: ', id);   

        const position = this.productos.findIndex((productos) => productos.id === id);
        console.log('.:: Producto Position: ', position);

        if (position == -1) {
            return {
                msg: "Producto no existe",
            };
        }
        
        this.productos.splice(position, 1);
        return {
            msg: "Producto eliminado correctamente",
        };
    }


    
}

