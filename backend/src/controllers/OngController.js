const crypto = require('crypto');
const connection = require('../database/conection');
module.exports ={
    //listando todos os dados da tabela Ongs
    async index (req, res){
        const ongs = await connection('ongs').select('*');
        return res.json(ongs);
    },
    async create(req,res){
        const {name, email, whatsapp, city, uf } = req.body;
        //criando id com o crytpo numero aleatorio de 4 bytes em formato Hexadecimal
        const id = crypto.randomBytes(4).toString('HEX');
        
        //cadastrar ongs
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
        return res.json({ id });
   } 
};