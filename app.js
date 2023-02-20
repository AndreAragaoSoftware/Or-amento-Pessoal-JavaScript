class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }

  validarDados() {
    for(let i in this) {
      if (this[i] == undefined || this[i] == '' || this[i] == null){
        return false
      } 
    }
    return true
  }
}
 

class Bd {

  constructor() {
    let id = localStorage.getItem('id')

    if(id === null) {
      localStorage.setItem('id', 0)
    }
  }

  getProximoId() {
      let proximoId = localStorage.getItem('id')
      return parseInt(proximoId) + 1
  }

  gravar(d) {
    let id = this.getProximoId()
    localStorage.setItem(id, JSON.stringify(d))

    localStorage.setItem('id', id)
  }

  recuperarTodosRegistros() {

    //array de despesas
    let despesas = Array()


    let id = localStorage.getItem('id')
    
    //recuperar todas as despesas cadastradas em localStorege 
    for(let i = 1; i <= id; i++) {

      //recuperar a despesa
      // parse = traforma em objetos literais
      let despesa = JSON.parse(localStorage.getItem(i))
      
      //existe a possibilidade de haver indices que foram pulados ou removidos
      if(despesa === null) {
        continue
      }

      despesas.push(despesa)
    }
    return despesas
  }

} // fim Bd

let bd = new Bd()


function cadastrarDespesa() {

  let ano = document.getElementById('ano')
  let mes = document.getElementById('mes')
  let dia = document.getElementById('dia')
  let tipo = document.getElementById('tipo')
  let descricao = document.getElementById('descricao')
  let valor = document.getElementById('valor')

  let despesa = new Despesa(
    ano.value,
    mes.value, 
    dia.value, 
    tipo.value, 
    descricao.value, 
    valor.value
  )

  if (despesa.validarDados()) {
    bd.gravar(despesa)
    //dialog de sucesso
    $('#modalRegistraDespesa').modal('show')
    
    document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
    document.getElementById('titulo').className = 'modal-header text-success'
    document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
    document.getElementById('modal_voltar_corrigir').innerHTML = 'Voltar'
    document.getElementById('modal_voltar_corrigir').className = 'btn btn-success'

    //limpando campo do formulario
    ano.value = ''
    mes.value = ''
    dia.value = ''
    tipo.value = ''
    descricao.value = ''
    valor.value = ''
    
 
  } else {
    //dialog de erro
    $('#modalRegistraDespesa').modal('show')
    
    document.getElementById('modal_titulo').innerHTML = 'Erro na gravação'
    document.getElementById('titulo').className = 'modal-header text-danger'
    document.getElementById('modal_conteudo').innerHTML = 'Existem campos obrigatorios que não foram preenchidos'
    document.getElementById('modal_voltar_corrigir').innerHTML = 'Voltar e corrigir'
    document.getElementById('modal_voltar_corrigir').className = 'btn btn-danger'
  } 
} // fim de cadastrarDespesa

function carregaListaDespesas() {
    let despesas = Array()
  
    despesas = bd.recuperarTodosRegistros()

    //selecionando o elemento tbody da tabela
    let listaDespesas =  document.getElementById('listasDespesas')

    //percorrer o array despesas , listando cada despesa de forma dinâmica
    despesas.forEach(function(d) {
      
      //criando a linha (tr)
      let linha = listaDespesas.insertRow()

      //criar as colunas (td)
      linha.insertCell(0).innerHTML = `${ d.dia}/${d.mes}/${d.ano}`  
      
      //ajustar o tipo
      switch (d.tipo) {
        case '1':
          d.tipo = 'Alimentação'
          break;
        case '2':
          d.tipo = 'Educação'
          break;
        case '3':
          d.tipo = 'Lazer'
          break;
        case '4':
          d.tipo = 'Saúde'
          break;
        case '5':
          d.tipo = 'Transporte'
          break;
      
        default:
          break;
      }
      linha.insertCell(1).innerHTML = d.tipo

      linha.insertCell(2).innerHTML = d.descricao
      linha.insertCell(3).innerHTML = d.valor

    })


}


