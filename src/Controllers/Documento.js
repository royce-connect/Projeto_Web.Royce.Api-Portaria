const padrao = require('../padrao');
const sql = require("mssql");
const connStr = "Server=191.238.219.249,1822;Database=manbrape_pro;User Id=ace4;Password=@4_dba;";

module.exports = {

    async PedirDoc(request, response){
        var cod_erro = 404;  
        
        var valida = padrao.ValidaRequisicao(request, response);        

        if(valida.Cod_Erro != 0){
            return response.status(valida.Cod_Erro).json({ success: false, message: valida.Msg });            
        }               

        sql.connect(connStr).then(pool => { 
            const {                
                Documento
            } = request.query;

            return pool.request()
                 .input('V_Documento', sql.VarChar, Documento)                                  
                .execute('Sc_Ger_S_Portaria_Doc_Entrada');
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
    async DadosDoc(request, response){
        var cod_erro = 404;  
        
        var valida = padrao.ValidaRequisicao(request, response);        

        if(valida.Cod_Erro != 0){
            return response.status(valida.Cod_Erro).json({ success: false, message: valida.Msg });            
        }               

        sql.connect(connStr).then(pool => { 
            const {                
                Documento
            } = request.query;

            return pool.request()
                 .input('V_Documento', sql.VarChar, Documento)                                  
                .execute('Sc_Ger_S_Portaria_Doc');
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
    async Imagem(request, response){
        var cod_erro = 404;  

        sql.connect(connStr).then(pool => { 
            const {                
                Documento,
                Authorization
            } = request.query;

            if(Authorization != 'RoyceApp'){
                return response.status(203).json({ success: false, message: 'Não permitido' });            
            }               

            return pool.request()
                 .input('V_Documento', sql.VarChar, Documento)                                  
                .execute('Sc_Ger_S_Portaria_Doc_Entrada');
        }).then(result => {            
            sql.close();
            response.writeHead(200,{'content-type':'image/jpg'});
            response.write(result.recordset[0].Conteudo);
            return response.end();
            
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
    async IncluiDoc(request, response){
        var cod_erro = 404;  
        
        var valida = padrao.ValidaRequisicao(request, response);        

        if(valida.Cod_Erro != 0){
            return response.status(valida.Cod_Erro).json({ success: false, message: valida.Msg });            
        }               

        sql.connect(connStr).then(pool => { 
            const {                
                Documento,
                Arquivo_64,
                TpOperacao,
                Id_Arquivo,
                Id_TpArquivo,
                Descricao,
                TpArq                
            } = request.body;

            var data = null;

            try{          
                if(Arquivo_64 != null && Arquivo_64 != ""){
                    data = Buffer.from(Arquivo_64, 'base64');                
                }
                
            }catch(err){
                return response.status(404).json(err);
            }

            return pool.request()
                 .input('V_TpOperacao', sql.VarChar, TpOperacao)  
                 .input('V_Documento', sql.VarChar, Documento)  
                 .input('V_Id_Arquivo', sql.Int, Id_Arquivo)  
                 .input('V_Id_TpArquivo', sql.Int, Id_TpArquivo)  
                 .input('V_Descricao', sql.VarChar, Descricao)  
                 .input('V_TpArq', sql.VarChar, TpArq)  
                 .input('V_Conteudo', sql.Image, data)                              
                .execute('Sc_Ger_M_PortariaArquivo');
        }).then(result => {            
            sql.close();
            return response.json(result.recordset);           
            
        }).catch(err => {           
            sql.close();
            console.log(err);
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
    async Saida(request, response){
        var cod_erro = 404;  
        
        var valida = padrao.ValidaRequisicao(request, response);        

        if(valida.Cod_Erro != 0){
            return response.status(valida.Cod_Erro).json({ success: false, message: valida.Msg });            
        }               

        sql.connect(connStr).then(pool => { 
            const {                
                Cracha        
            } = request.query;

            return pool.request()
                 .input('V_Cracha', sql.VarChar, Cracha)                                       
                .execute('Sc_Ger_S_Portaria_Doc_Saida');
        }).then(result => {            
            sql.close();
            return response.json(result.recordset);           
            
        }).catch(err => {           
            sql.close();
            console.log(err);
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

    }

};