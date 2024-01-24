const padrao = require('../padrao');
const sql = require("mssql");
const connStr = "Server=191.238.219.249,1822;Database=manbrape_pro;User Id=ace4;Password=@4_dba;";

module.exports = {

    async Incluir(request, response){
        var cod_erro = 404;  
        
        var valida = padrao.ValidaRequisicao(request, response);        

        if(valida.Cod_Erro != 0){
            return response.status(valida.Cod_Erro).json({ success: false, message: valida.Msg });            
        }               

        sql.connect(connStr).then(pool => { 
            const {                
                Id_Portaria,
                Id_Horario,
                Veiculo,
                Placa,
                Condutor,
                Flg_Tipo,
                Empresa,
                Documento,
                Flg_Origem,
                Cracha
            } = request.body;

            console.log(Id_Horario);
            var nn = Id_Horario.substring(0, Id_Horario.indexOf(':'));            
		console.log(nn);
console.log(nn.length);
            var nova_hora = Id_Horario;

            if(nn.length < 13){
                nova_hora = Id_Horario.replace('T', 'T0');
	    console.log(nova_hora);
            }            

	    console.log(new Date(nova_hora));

            return pool.request()
                 .input('V_Id_Portaria', sql.Int, Id_Portaria)    
		 .input('V_Id_Horario', sql.VarChar, nova_hora)    
                 .input('V_Veiculo', sql.VarChar, Veiculo)    
                 .input('V_Placa', sql.VarChar, Placa)    
                 .input('V_Condutor', sql.VarChar, Condutor)    
                 .input('V_Flg_Tipo', sql.VarChar, Flg_Tipo)    
                 .input('V_Empresa', sql.VarChar, Empresa)    
                 .input('V_Documento', sql.VarChar, Documento)    
                 .input('V_Flg_Origem', sql.VarChar, Flg_Origem)    
                 .input('V_Cracha', sql.VarChar, Cracha)    
                .execute('Sc_Ger_I_Portaria');
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
                    console.log(err);
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