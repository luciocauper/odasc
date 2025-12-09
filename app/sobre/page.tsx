import { title } from "@/components/primitives";
import { Link } from "@heroui/link";

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>Sobre o Observatório</h1>
      <article className="text-justify mt-10 gap-4 flex flex-col">
        <h2 className="text-4xl mb-6 font-medium">História</h2>

        <p>
          Este portal fez parte do Trabalho de Conclusão de Curso (TCC) do
          estudante{" "}
          <Link
            isExternal
            showAnchorIcon
            underline="hover"
            href="https://repositorio.ufc.br/bitstream/riufc/64368/1/2022_tcc_ebalves.pdf"
          >
            Emanoel Bezerra Alves
          </Link>
          , na época, academico em Ciência da Computação na Universidade Federal
          do Ceará (UFC)
        </p>

        <p>
          O objetivo desse portal é possibilitar compartilhar e tornar acessível
          dados abertos para a populaçao que faz parte do Sertão dos Crateús. De
          início, os dados que estão presente até o momento são relacionados ao
          covid-19 e a doenças catalogadas no CID BR 10. As informações
          relacionadas ao covid-19 são extraidas da base de dados do{" "}
          <Link
            isExternal
            showAnchorIcon
            underline="hover"
            href="https://github.com/wcota/covid19br"
          >
            Wesley Cota
          </Link>
          . A coleta dos dados é feita diariamente de forma automática.
        </p>

        <p>
          Já as informações das doenças do CID BR 10 são extraidas de tabelas
          disponibilizadas pelo{" "}
          <Link
            isExternal
            showAnchorIcon
            underline="hover"
            href="http://extranet.saude.ce.gov.br/tabulacao/deftohtm.exe?sim/obito.def"
          >
            Governo do Estado do Ceará
          </Link>
          . As informações são atualizadas a cada 15 dias, nossa aplicação
          executa a extração e atualiza a base de dados de acordo com o
          intervalo de dias.
        </p>

        <p>
          Buscamos apresentar as informaçoes da melhor forma possível, com a
          finalidade de tornar mais acessível as informações para os usuários.
          Você vai encontrar as informações em forma de mapa interativo, onde é
          possível selecionar a região e o estado, gráficos onde exibe as
          informações centrada na região do Sertão dos Crateús e por a cidade
          selecionada pelo usuário, também há tabelas onde é feita a listagem
          das informações por cada cidade pertencente a região, o historico dos
          dados com base na cidade selecionada e no intervalo de dias marcado
          pelo usuário.
        </p>

        <p>
          É disponibilizado uma lista de PDF's com os dados de cada atualização
          do covid-19 e das doenças do CID BR 10. É possível visualizar o
          arquivo e também baixa-lo caso queira compartilhar.
        </p>

        <h2 className="text-4xl mt-6 font-medium">Como está agora?</h2>

        <p>
          Após passar por uma análise de acessibilidade por{" "}
          <Link
            isExternal
            showAnchorIcon
            underline="hover"
            href="https://repositorio.ufc.br/bitstream/riufc/75370/1/2023_tcc_msvcosta.pdf"
          >
            Maria Samila Costa Vieira
          </Link>
          , foi verificado que o portal carecia de acessibilidade web em
          diversos pontos.
        </p>

        <p>
          Para atender tais requisitos de acessibilidade, o portal está passando
          por uma reformulação completa, tanto no design quanto na estrutura do
          código, uma vez que o código antigo, além de não atender os requisitos
          de acessibilidade, estava com uma estrutura difícil de manter e
          escalar.
        </p>
      </article>
    </div>
  );
}
