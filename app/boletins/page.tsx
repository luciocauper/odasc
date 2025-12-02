"use client";

import React from "react";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import Result from "@/components/result";

export const doencas = [
  { key: "covid19", label: "COVID-19" },
  { key: "cidbr", label: "CID-BR" },
];

export default function BoletinsPage() {
  const [value, setValue] = React.useState<Set<string>>(new Set());

  return (
    <div>
      <h1 className="text-4xl text-center font-medium">
        Lista de boletins epidemiológicos
      </h1>

      <div className="flex items-center justify-center w-full mt-8">
        <div className="flex gap-4 max-w-xl w-full justify-center">
          <Select
            label="Selecione a doença"
            selectedKeys={value}
            onSelectionChange={setValue}
            className="w-full"
          >
            {doencas.map((doenca) => (
              <SelectItem key={doenca.key}>{doenca.label}</SelectItem>
            ))}
          </Select>

          <Button color="primary" variant="solid" className="px-6">
            Buscar
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <Result name={Array.from(value)[0] || ""} />
      </div>
    </div>
  );
}
