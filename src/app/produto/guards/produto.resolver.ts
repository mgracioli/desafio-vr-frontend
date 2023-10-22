import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { TProduto } from "../@types/produto.types";
import { ProdutoService } from "src/app/services/produto.service";

export const ProdutoResolver: ResolveFn<TProduto[]> = (route: ActivatedRouteSnapshot) => {
    return inject(ProdutoService).buscarProdutoPorId(route.paramMap.get('id'));
}
