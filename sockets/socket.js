const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBands(new Band('Queen'));
bands.addBands(new Band('Bon Jovi'));
bands.addBands(new Band('Heroes del Silencio'));
bands.addBands(new Band('Metallica'));


//* MENSAJES DE SOCKETS
io.on('connection', client =>{
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () =>{
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload)=>{
        console.log('Mensaje!!!', payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });

    client.on('vote-band', (payload)=>{
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload)=>{
        const newBand = new Band(payload.name);
        bands.addBands(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload)=>{
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    /*client.on('emitir-mensaje', (payload)=>{

        client.broadcast.emit('nuevo-mensaje', payload);
    });*/
});