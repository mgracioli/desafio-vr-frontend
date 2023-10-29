import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";

import { ProdutoService } from "src/app/services/produto.service";
import { TProdutoLoja, TRetornoApi } from "../@types/produto.types";

export const ProdutoLojaResolver: ResolveFn<TRetornoApi<TProdutoLoja[]>> = (route: ActivatedRouteSnapshot) => {
    return inject(ProdutoService).buscarProdutoLoja(route.paramMap.get('id'));
}
