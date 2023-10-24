import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { TProduto, TRetornoApiErro, TRetornoApiProdLoja, TRetornoApiProduto } from "../@types/produto.types";
import { ProdutoService } from "src/app/services/produto.service";

export const ProdutoResolver: ResolveFn<TRetornoApiProdLoja | TRetornoApiProduto | TRetornoApiErro> = (route: ActivatedRouteSnapshot) => {
    return inject(ProdutoService).buscarProduto(route.paramMap.get('id'));
}
