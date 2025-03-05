import Inicio from "@/image/page";
import Navbar from "./navbar/page";
import { title } from "process";

export const metadata = {
  title: "Gerenciador de eventos",
};

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-6">
        <div className="p-3 m-4 rounded-xl bg-slate-100">
          <Inicio />
        </div>
        <div className="flex flex-col justify-center items-center max-w-lg">
          <div className="p-4 m-2 rounded-xl shadow-lg bg-white w-full text-center">
            <h1 className="text-2xl font-semibold text-gray-700">
              Bem-vindo ao Organizador de Eventos!
            </h1>
          </div>
          <div className="p-4 m-2 rounded-xl shadow-lg bg-white w-full text-center">
            <p className="text-lg text-gray-600">
              Um organizador de eventos transforma ideias em memórias
              inesquecíveis, garantindo que cada detalhe seja perfeito, para que
              você aproveite o momento sem preocupações.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
