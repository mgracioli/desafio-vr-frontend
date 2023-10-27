import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { TProdutoLoja, TRetornoApi } from "../@types/produto.types";
import { ProdutoService } from "src/app/services/produto.service";

export const ProdutoResolver: ResolveFn<TRetornoApi<TProdutoLoja[]>> = (route: ActivatedRouteSnapshot) => {
    return inject(ProdutoService).buscarProduto(route.paramMap.get('id'));
}
