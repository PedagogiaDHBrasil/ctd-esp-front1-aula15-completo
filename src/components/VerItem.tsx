import { useQuery } from "react-query";
import { getItemDetalhe } from "../queries/items.queries";
import PropTypes from "prop-types";
import { Item } from "../types/item.types";

/**
 * Obtenha o id do item do url da Poke API
 * @author Digital House
 * @param {string} url a url que aponta para um item do Poke API
 * @return {string} o id da Poke Item
 */
export const extractItemId = (url: string): string => {
  return url.split("item")[1].replace("/", "");
};

interface VerItemProps {
  item: Item;
}

/**
 * Visualize um item com seu nome e imagens. As imagens são extraídas por meio de uma chamada
 * extra para a Poke API de itens individuais.
 *
 * Ej:
 * <pre>
 *     <VerItem item={item} />
 *
 * </pre>
 *
 * @author Digital House
 * @param item O item a ser mostrado
 */
const VerItem = ({ item }: VerItemProps) => {
  const idItem = extractItemId(item.url);
  const { data, isLoading, isError } = useQuery(["item", idItem], () =>
    getItemDetalhe(idItem)
  );

  if (isLoading) return <div>Carregando detalhes do item...</div>;
  if (isError) return <div>Falha ao carregar detalhes...</div>;

  return data ? (
    <div>
      <h4>Item: {item.name}</h4>
      <img src={data.sprites.default} />
    </div>
  ) : null;
};

VerItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
};

export default VerItem;
