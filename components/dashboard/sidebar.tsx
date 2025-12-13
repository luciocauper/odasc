"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import Link from "next/link";
import { Select, SelectItem } from "@heroui/select";
import { Card, CardBody } from "@heroui/card";

export const painel = [
  { key: "COVID", label: "COVID-19" },
  { key: "cidbr", label: "CID-BR" },
];

export const region = [
  { key: "ceara", label: "Ceará" },
  { key: "odasc", label: "Sertões dos Crateús" },
];

export default function Sidebar() {
  return (
    <div>
      <Card className="bg-transparent border-2 border-gray-200 dark:border-gray-500">
        <CardBody className="gap-4">
          <Select label="Tipo de painel">
            {painel.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>

          {/* <Select label="Região">
            {region.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select> */}
        </CardBody>
      </Card>
    </div>
  );
}
