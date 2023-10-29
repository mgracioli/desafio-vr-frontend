import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

import { ProdutoService } from "src/app/services/produto.service";
import { TProduto, TRetornoApi } from "../@types/produto.types";

export const ProdutosResolver: ResolveFn<TRetornoApi<TProduto[]>> = () => {
    return inject(ProdutoService).buscarProdutos();
}
