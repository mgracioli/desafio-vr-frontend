import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, of } from 'rxjs';
import { TToastInfo } from '../components/toast/@Types/toast.types';
import { FormValidator } from '../utils/form-validator';
import { TProduto } from './@types/produto.types';
import { Router, ActivatedRoute } from '@angular/router'
import { TLoja } from './@types/loja.types';
@Component({
  selector: 'produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  formulario: FormGroup;
  lojas$: Observable<TLoja[]>;
  toasts: Array<TToastInfo>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) {
    // super();  //chama o construtor da classe BaseFormComponet
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      codigo: [null],
      descricao: [null, [Validators.required, Validators.maxLength(60)]],
      custo: [null, [FormValidator.equalsTo('email')]],
      precoVenda: [null],
    });

    //formulário reativo para consulta do CEP
    //.statusChanges é um observable que emite um evento sempre que o status dos validators do campo/controle cep forem alterados
    //ao emitir um evento de mudança de status do campo cep (quando ele for alterado), o programa executa as funções do pipe. O pipe retorna um observable (ele é um observable); o programa detecta essas mudanças por meio do subscribe (o subscribe, nesse caso, fica monitorando os eventos emitidos pelo pipe() que, por sua vez, monitora os eventos emitidos pelo statusChanges)
    // this.formulario.get('endereco.cep').statusChanges
    //   .pipe(
    //     distinctUntilChanged(), //essa função só faz rodar a linha de baixo quando o status for modificado, nesse caso, como o CEP precisa ter 8 digitos para ser válido (isso foi definido no validator) ele vai imprimir o status inválido, inicialmente e, só após digitar o oitavo digito, ele vai imprimir na tela de novo o novo status de 'válido'. Sem essa função o programa ficaria imprimindo inválido a cada digito que eu colocasse do cep (até o 7º digito, depois imprimiria 'valido')
    //     //tap(value => console.log('status do CEP: ', value)), //o pipe operator 'tap' é usado para debug
    //     switchMap(status => status === 'VALID' ? this.cepService.consultaCep(this.formulario.get('endereco.cep').value)  //o método consultaCep() retorna um observable (que é a chamada http lá do viaCep)
    //       : empty())  //empty retorna um observable vazio - o operador switchMap() precisa que sejam retornados observables
    //   )
    //   .subscribe(dados => dados ? this.populaDadosForm(dados) : {});

    //verifica qual estado está selecionado na combobox de estados e atualiza a combobox de cidades
    //sempre que um Estado for selecionado na combobox, o programa executa o código abaixo (que vai fazer a busca apenas pelas cidades do estado selecionado)
    // this.formulario.get('endereco.estado').valueChanges
    //   .pipe(
    //     //tap(estado => console.log('Estado: ', estado)),
    //     map(estado => this.estados.filter(e => e.sigla == estado)), //a variável estado corresponde à sigla do estado que foi selecionado na combobox (pelo html eu posso ver que o valor da combobox foi definido como estado.sigla); o filter vai filtrar a variável estados e retornar o estado cuja sigla é igual àquela do estado selecionado na combobox e armazenar esse objeto na variável estados. Já "e" representa cada estado do array estados (cada estado, nesse caso, é um objeto, por isso eu tenho que fazer a busca por e.sigla)
    //     map(estados => estados && estados.length > 0 ? estados[0].id : empty()), //esse map verifica se na variável estados (que é um array de estados) tem algum objeto, ou seja, se conseguiu encontrar algum estado cuja sigla seja igual à do estado selecionado na combobox e, caso, tenha achado, retorna o id esse objeto (o objeto vai sempre estar na posição estado[0]) porque cada estado tem uma sigla única, então sempre vai ser retornado um só objeto, se o array "estados" estiver vazio é pq não foi achado nenhum estado, por isso, retorna empty() para que o pipe pare de ser executado
    //     switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)), //switchmap faz a troca de observable, ou seja, assim que os maps achima forem executados, a minha variavel estados já vai conter o id do estado selecionado, por isso, eu posso cancelar esse observable e criar outro que vai ser responsável por chamar o método getCidades() lá do dropdownService; estadoId é o resultado do map da linha nterior, ou seja, essa variável contém o id do estado selecionado
    //     //tap(console.log),
    //   )
    //   .subscribe(cidades => this.cidades = cidades); //o subscribe se inscreve no observable valueChanges que, por sua vez, detecta a alteração de valor na combobox endereco.estado
  }

  onSubmit() {

  }

  incluirProduto() {
    this.router.navigate(['cadastro'], { relativeTo: this.route })
  }

  onEdit(produto: TProduto) {
    this.router.navigate(['cadastro', produto.id], { relativeTo: this.route })
  }
}
