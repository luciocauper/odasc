import Image from "next/image";
import { Button, ButtonGroup } from "@heroui/button";
import Link from "next/link";
import { OnPressStartEvent } from "framer-motion";

export default function Home() {
  return (
    <main>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-bold mt-8 text-left justify-center">
              Observatório de dados abertos dos Sertões dos Crateús
            </h1>
            <p className="text-2xl text-left">
              Confira diariamente a situação de risco de seu município e região.
            </p>
            <Button
              as={Link}
              href="/painel"
              color="primary"
              variant="ghost"
              className="mt-8"
            >
              Acesse o painel
            </Button>
          </div>
          <Image
            src="/map.png"
            alt={"Região dos Sertões dos Crateús"}
            width={500}
            height={500}
            className="mx-auto"
          />
        </div>
      </section>
    </main>
  );
}
