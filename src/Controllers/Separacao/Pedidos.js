const padrao = require('../../padrao');
const sql = require("mssql");
const connStr = "Server=191.242.243.14,1844;Database=royce_ctg;User Id=ace4;Password=@4_dba;";

module.exports = {
    
    async Pedidos(request, response){
        var cod_erro = 404;  
        
        var valida = padrao.ValidaRequisicao(request, response);        

        if(valida.Cod_Erro != 0){
            return response.status(valida.Cod_Erro).json({ success: false, message: valida.Msg });            
        }               

        sql.connect(connStr).then(pool => { 
            const {                
                Codigo                
            } = request.query;
                        
            return pool.request()
                 .input('V_Id_Codigo', sql.Int, Codigo)                     
                .execute('SE_ROY_App_S_Sep1');
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

    async Itens(request, response){
        var cod_erro = 404;  
        
        var valida = padrao.ValidaRequisicao(request, response);        

        if(valida.Cod_Erro != 0){
            return response.status(valida.Cod_Erro).json({ success: false, message: valida.Msg });            
        }               

        sql.connect(connStr).then(pool => { 
            const {                
                Pedido                
            } = request.query;
                        
            return pool.request()
                 .input('V_Id_Pedido', sql.Int, Pedido)                     
                .execute('SE_ROY_App_S_Sep2');
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