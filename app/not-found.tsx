import { title } from "@/components/primitives";
import { Button } from "@heroui/button";
import {Link} from "@heroui/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-4/5 text-center justify-center">
        <h1 className={title()}>Error 404 - Página não encontrada!</h1>
        <p className="mt-8">Parece que você tentou acessar uma página que não existe</p>
        <Button color="primary" variant="shadow" className="mt-10">
          <Link className="text-white" href="/">
          Voltar para a página inicial
          </Link>
        </Button>
      </div>
    </main>
  );
}