import ListarCategoriasItem, {
  extractCategoriaId,
} from "./ListarCategoriasItem";
import { useQuery } from "react-query";
import { getItemCategory } from "../queries/items.queries";
import PropTypes from "prop-types";
import { Category } from "../types/category.types";
import VerItem from "./VerItem";

interface ListarItemsProps {
  categoria: Category;
}

/**
 * Ver uma categoria com seu nome e URL
 *
 * Ex:
 * <pre>
 *     <ListarCategoriasItem categoria={categoria}
 *                             selecionarCategoria={(categoria) => {}}/>
 *
 * </pre>
 *
 * @author Digital House
 * @param categoria a categoria a ser exibida
 * @param selecionarCategoria uma função que é executada ao clicar na categoria
 */
const ListarItems = ({ categoria }: ListarItemsProps) => {
  const idCategoria = extractCategoriaId(categoria.url);
  const { data, isLoading, isError } = useQuery(
    ["itemCategory", idCategoria],
    () => getItemCategory(idCategoria)
  );

  if (isLoading) return <div>Cargando items...</div>;
  if (isError) return <div>No se pudo cargar los items...</div>;

  return data ? (
    <div>
      <h4>Items</h4>

      {data.items.map((item) => (
        <VerItem key={item.name} item={item} />
      ))}
    </div>
  ) : null;
};

ListarCategoriasItem.propTypes = {
  categoria: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
};

export default ListarItems;
