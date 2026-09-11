import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

interface User {
    id: string;
    name: string;
    email: string;
}
@Controller('users')
export class UserController {

    private users: User[] = [
        {
            id: '1',
            name: 'Juanita',
            email: 'juanita@correo.com'
        },
        {
            id: '2',
            name: 'Carlos',
            email: 'carlos@correo.com'
        },
        {
            id: '3',
            name: 'Ana',
            email: 'ana.gomez@correo.com'
        },
        {
            id: '4',
            name: 'Mateo',
            email: 'mateo.perez@correo.com'
        },
        {
            id: '5',
            name: 'Sofía',
            email: 'sofia.ruiz@correo.com'
        },
        {
            id: '6',
            name: 'David',
            email: 'david.lopez@correo.com'
        },
        {
            id: '7',
            name: 'Lucía',
            email: 'lucia.torres@correo.com'
        },
        {
            id: '8',
            name: 'Andrés',
            email: 'andres.castro@correo.com'
        },
        {
            id: '9',
            name: 'Valentina',
            email: 'valentina.morales@correo.com'
        },
        {
            id: '10',
            name: 'Alejandro',
            email: 'alejandro.ortiz@correo.com'
        }
    ];

    @Get('')
    getAllUsers() {
        return this.users;
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        console.log('.:: User ID: ', id)
        const user = this.users.find((user) => user.id === id);
        console.log('.:: usuario buscado: ', user)
        if (user === undefined) {
            return {
                result: "Usuario no existe"
            }
        }
        return user;
    }

    @Get('search/:name')
    getUserUserByName(@Param('name') name: string) {
        const data = this.users.find((user) => user.name === name);
        if (!data) return { result: "El correo del nombre ingresado no existe" }
        return { result: data?.email };
    }


    /**
     * 
     * NO SE PUEDE CREAR USUARIO PORQUE NO HAY UN MODELO DE USUARIO, SOLO HAY UN MODELO DE PRODUCTO

        //Punto E: Crear Producto
    @Post()
    createUser(@Body() user:  User){
        console.log('.:: user: ', user);
        this.users.push(user);
        return {
        msg: "Usuario creado correctamente",
        data: user
        };
    }
        */

    //Punto E: Crear Usuario

    @Post()
    createUser(@Body() userPayLoad:  User){
        console.log('.:: user: ', userPayLoad);


        const data = this.users.find((user) => user.id === userPayLoad.id);
        if (data) {
            return {
                msg: "Usuario ya existe",
                data: data
            };
        }
        this.users.push(userPayLoad);
        return {
        msg: "Usuario creado correctamente",
        data: userPayLoad
        };
    }

    // Con esta funcion es posible eliminar un usuario por su ID, si el usuario no existe,
    //  se devuelve un mensaje indicando que el usuario no existe. Si el usuario existe,
    //  se elimina de la lista de usuarios y se devuelve un mensaje indicando que el usuario fue eliminado correctamente.
    @Delete(':id')
    deleteUser(@Param('id') id : string) {

        console.log('.:: User ID: ', id);
        const position = this.users.findIndex((user) => user.id === id);
        console.log('.:: User Position: ', position);
        

        if (position == -1) {
            return {
                msg: "Usuario no existe",
            };
        }

        this.users.splice(position, 1);
        
        return {
            msg: "Usuario eliminado correctamente",
        };
    }

    //Esta funcion permite actualizar un usuario existente en la lista de usuarios. 
    // Se busca el usuario por su ID y se actualizan los campos proporcionados en el
    //  objeto userChange. Si el usuario no existe, se devuelve un mensaje indicando 
    // que el usuario no existe. Si el usuario existe, se actualiza y se devuelve un 
    // mensaje indicando que el usuario fue actualizado correctamente.

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() userChange: User) {


        console.log('.:: User ID Update:', id);
        console.log('.:: userupdated:', userChange);

        const position = this.users.findIndex((user) => user.id === id);
        if (position == -1) {
            return {
                msg: "Usuario no existe",
            };
        }
        const existingUser = this.users[position];
        console.log('.:: existingUser:', existingUser);

        const updatedUser = { ...existingUser, ...userChange };
        this.users[position] = updatedUser;
        
        


        return {
            msg: "Usuario actualizado correctamente",
            data: {}
        }


    }
        






}