import { useContext } from "react";
import { ContextoCategorias } from "../context/ContextoCategorias";
import ListarItems from "./ListarItems";

/**
 * Visualize a categoria selecionada no contexto com uma lista de itens
 *
 * Ex:
 * <pre>
 *     <VerCategoria />
 *
 * </pre>
 *
 * @author Digital House
 */
const VerCategoria = () => {
  const { categoriaSelecionada } = useContext(ContextoCategorias);
  if (!categoriaSelecionada) return null;

  return (
    <div id="verCategoria">
      <h3 className="titulo">Categoria: {categoriaSelecionada.name}</h3>
      <ListarItems categoria={categoriaSelecionada} />
    </div>
  );
};

export default VerCategoria;
