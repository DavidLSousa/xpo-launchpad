import React, { createContext, useContext, ReactNode } from "react";
import { IServiceProvider } from "../domain/interfaces/IServiceProvider";
import { AxiosServiceAdapter } from "../adapters/AxiosServiceAdapter";

// Injeção de Dependência: Aqui você escolhe se usa Axios, Fetch, Mock, etc.
const serviceProvider: IServiceProvider = new AxiosServiceAdapter();

const ServiceContext = createContext<IServiceProvider>(serviceProvider);

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ServiceContext.Provider value={serviceProvider}>
    {children}
  </ServiceContext.Provider>
);

export const useService = () => useContext(ServiceContext);
