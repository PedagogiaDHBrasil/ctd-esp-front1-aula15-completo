import { useContext } from "react";
import { useQuery } from "react-query";
import { getItemCategories } from "../queries/items.queries";
import ListarCategoriasItem, {
  extractCategoriaId,
} from "./ListarCategoriasItem";
import { ContextoCategorias } from "../context/ContextoCategorias";
import { Category } from "../types/category.types";

/**
 * Veja uma lista de categorias de itens de poke-item acessando a API de categorias
 *
 * Ex:
 * <pre>
 *     <ListarCategorias />
 *
 * </pre>
 *
 * @author Digital House
 */
const ListarCategorias = () => {
  const { selecionarCategoria } = useContext(ContextoCategorias);

  const {
    data: categorias,
    isLoading,
    isError,
  } = useQuery("itemCategories", getItemCategories);

  if (isLoading) return <div>Carregando categorias...</div>;
  if (isError) return <div>Falha ao carregar categorias...</div>;

  return (
    <div id="listarCategorias">
      {categorias &&
        categorias.map((categoria: Category) => (
          <ListarCategoriasItem
            categoria={categoria}
            selecionarCategoria={selecionarCategoria}
            key={extractCategoriaId(categoria.url)}
          />
        ))}
    </div>
  );
};

export default ListarCategorias;
