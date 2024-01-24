const padrao = require('../padrao');
const sql = require("mssql");
const connStr = "Server=191.252.157.184,1822;Database=Airo_DsAruja_Pro;User Id=ace4;Password=@4_dba;";

// dados de conexão se necessário
// SERVIDOR=191.252.157.184,1822
// DATABASE=Airo_DsAruja_Pro
// PORTA=1822
// USUARIO=468'
// SENHA=3'RWUT

module.exports = {
    
    async Incluir(request, response){
        var cod_erro = 404;  
        
        var valida = padrao.ValidaRequisicao(request, response);        

        if(valida.Cod_Erro != 0){
            return response.status(valida.Cod_Erro).json({ success: false, message: valida.Msg });            
        }               

        sql.connect(connStr).then(pool => { 
            const {                
                Num_Nota                
            } = request.body;
                        
            return pool.request()
                 .input('V_CodigoBarra', sql.VarChar, Num_Nota)                     
                .execute('Sc_Mob_M_TesteCodigoBarra');
        }).then(result => {            
            sql.close();
            return response.json(result.recordset);           
        }).catch(err => {           
            sql.close();
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