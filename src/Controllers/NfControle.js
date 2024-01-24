const padrao = require('../padrao');
const sql = require("mssql");
const connStr = "Server=191.238.219.249,1822;Database=royce;User Id=Internet;Password=ryc7d6f3c7;";

module.exports = {
    
    async Incluir(request, response){
        var cod_erro = 404;  
        console.log('entrou Royce');
        var valida = padrao.ValidaRequisicao(request, response);        

        if(valida.Cod_Erro != 0){
            return response.status(valida.Cod_Erro).json({ success: false, message: valida.Msg });            
        }               

        sql.connect(connStr).then(pool => { 
            const {                
                Num_Nota                
            } = request.body;
                    console.log('entrou body Royce');
            return pool.request()
                 .input('V_Chave', sql.VarChar, Num_Nota)                     
                .execute('SE_ROY_App_M_EmbarqueAponta');
        }).then(result => {   
        console.log('entrou then Royce');         
            sql.close();
            return response.json(result.recordset);           
        }).catch(err => {           
            sql.close();
        console.log('entrou erro Royce ' + JSON.stringify(err));         
            if(typeof(err) == typeof("")){
                return response.status(cod_erro)
                .json({                
                    Mensagem: err
                });

            }else{
                if(err.originalError != null){
                    
                    return response.status(cod_erro)
                    .json({                
                        Mensagem: err.originalError.info.message
                    });
                }else{
                    return response.status(cod_erro)
                    .json({                
                        Mensagem: err
                    });
                }
                

            }

        });

    },

};