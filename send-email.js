const request = require('request');
const dateFormat = require('dateformat');

module.exports.sendEmail = (result)=>{
	
	//Assuno e Corpo da mensagem
	const assunto = '[LRX] Análise Solicitada por '+result.nome;
	let   corpo = '<p>Olá '+result.nome+',<br> O Sistema de Medida DRX do Laboratório de Raios-X da UFC';
		  corpo+= 'detectou que sua amostra, identificada como '+result.identificacao_da_amostra+', teve inicío neste exato momento, '+dateFormat(new Date(), "dd/mm/yyyy HH:MM:ss");+'.</p>';
		  corpo+= '<p> Para acompanhar sua medida, basta acessar o link a baixo. </p>';
		  corpo+= '<p><a href="http://csd.fisica.ufc.br:8080" target="_blank">Sistema de Medida DRX em Tempo Real</a></p>';
		  corpo+= '<p>Caso possua alguma dúvida, por favor entre em contato com o Laboratório ';
		  corpo+= 'por meio do endereço de email lrxufc@gmail.com, ou pelo telefone 85 33669917.</p>';
		  corpo+= '<p style="text-align:right;">Atenciosamente, <br>Laboratório de Raios-X</p>';
	
	const email = result.email;

	//Dados a serem enviados
	const data = {assunto, corpo, email};

	//dados do post
	const op = {
		url:'http://csdint.fisica.ufc.br/solicitacoes/send-email.php',
		form: {email:JSON.stringify(data)}
	};

	//Envia o post para mandar o email
	request.post(op, (err,httpResponse,body) =>{ 
		console.log(body);
	});
}