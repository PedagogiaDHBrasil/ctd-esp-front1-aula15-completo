import React, { useReducer } from "react";
import {Category} from "../types/category.types";

// Tipamos nossas ações. Eles geralmente são movidos para um arquivo chamado actions.ts ou no nosso caso
// categorias.ações.ts
interface Action {
    type: "SELECIONAR_CATEGORIA"
    payload: {
        categoria: Category
    }
}

// Tipamos o estado, usando um tipo para a categoria e um tipo para a função
interface State {
    categoriaSelecionada: Category | null;
    selecionarCategoria: (categoria: Category) => void;
}

const initialState:State = {
    categoriaSelecionada: null,
    selecionarCategoria: (categoria: Category) => {}
};

const reducer = (state:State, action: Action) => {
   switch (action.type){
       case "SELECIONAR_CATEGORIA":
           return {...state,
           categoriaSelecionada: action.payload.categoria}
       default:
           return state;
   }
};

export const ContextoCategorias = React.createContext<State>(initialState);

const ProviderCategorias = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Debemos tipar la siguiente funcion que carga las categorias
    const selecionarCategoria = (categoria: Category) => {
        dispatch({
            type: 'SELECIONAR_CATEGORIA',
            payload: {
                categoria
            },
        });
    };

    return (
        <ContextoCategorias.Provider
            value={{
                categoriaSelecionada: state.categoriaSelecionada,
                selecionarCategoria,
            }}
        >
            {children}
        </ContextoCategorias.Provider>
    );
};

export default ProviderCategorias;