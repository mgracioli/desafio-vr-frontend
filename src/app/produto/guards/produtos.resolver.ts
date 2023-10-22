import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { TProduto } from "../@types/produto.types";
import { ProdutoService } from "src/app/services/produto.service";

export const ProdutosResolver: ResolveFn<TProduto> = () => {
    return inject(ProdutoService).buscarProdutos();
}