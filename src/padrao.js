
module.exports = { 

    ValidaRequisicao(request, response){
        var objeto = {
            Cod_Erro: 0,
            Msg: ""
        };

        if(request.headers == null){
            objeto.Cod_Erro = 203;          
            objeto.Msg = 'Requisição não permitida!';
            return objeto;
        }        
        
        if(request.headers.authorization != "RoyceApp"){              
            objeto.Cod_Erro = 203;          
            objeto.Msg = 'Requisição não permitida!';
            return objeto;
        }
                
        return objeto;

    }


};