import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { TProduto, TRetornoApiErro, TRetornoApiProduto } from "../@types/produto.types";
import { ProdutoService } from "src/app/services/produto.service";

export const ProdutosResolver: ResolveFn<TRetornoApiProduto | TRetornoApiErro> = () => {
    return inject(ProdutoService).buscarProdutos();
}
