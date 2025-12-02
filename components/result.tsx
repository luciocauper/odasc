import { Link } from "@heroui/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";

interface ResultProps {
  name: string;
}

const mockResults = {
  covid19: [
    {
      id: 1,
      title: "Boletim COVID-19 - Semana Epidemiológica 45",
      date: "2024-11-10",
      url: "/boletins/covid-19/se-45",
    },
    {
      id: 2,
      title: "Boletim COVID-19 - Semana Epidemiológica 46",
      date: "2024-11-17",
      url: "/boletins/covid-19/se-46",
    },
    {
      id: 3,
      title: "Boletim COVID-19 - Semana Epidemiológica 47",
      date: "2024-11-24",
      url: "/boletins/covid-19/se-47",
    },
  ],
  cidbr: [
    {
      id: 1,
      title: "Boletim CID-BR - Outubro 2024",
      date: "2024-10-31",
      url: "/boletins/cid-br/2024-10",
    },
    {
      id: 2,
      title: "Boletim CID-BR - Novembro 2024",
      date: "2024-11-30",
      url: "/boletins/cid-br/2024-11",
    },
  ],
};

const columns = [
  { label: "Título", key: "title" },
  { label: "Data de Publicação", key: "date" },
];

export default function Result({ name }: ResultProps) {
  const results = mockResults[name as keyof typeof mockResults] || [];

  if (results.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500">
        <p>Nenhum resultado encontrado para a doença selecionada.</p>
      </div>
    );
  }

  return (
    <div>
      <Table aria-label="Resultados da busca">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={results}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Link href={item.url}>{item.title}</Link>
              </TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
