"use client";

import { useState, useEffect } from "react";
import Navbarsub from "../navbarsub/page";
import Link from "next/link";
import axios from "axios";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
}

export default function Dashboard() {
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [publicEvents, setPublicEvents] = useState<Event[]>([]);
  const [loadingUserEvents, setLoadingUserEvents] = useState(true);
  const [loadingPublicEvents, setLoadingPublicEvents] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      axios
        .get("http://localhost:3333/event", { params: { userId } })
        .then((res) => setUserEvents(res.data))
        .catch((err) => console.error("Erro ao carregar eventos do usuário:", err))
        .finally(() => setLoadingUserEvents(false));
    }

    // Buscar todos os eventos disponíveis
    axios
      .get("http://localhost:3333/event")
      .then((res) => setPublicEvents(res.data))
      .catch((err) => console.error("Erro ao carregar eventos públicos:", err))
      .finally(() => setLoadingPublicEvents(false));
  }, []);

  const handleSubscribe = async (eventId: number) => {
    const userId = localStorage.getItem("id");
    const date = new Date().toISOString(); // Aqui você pega a data atual, por exemplo
    
    if (!userId) {
      alert("Faça login para se inscrever em um evento.");
      return;
    }
  
    try {
      await axios.post("http://localhost:3333/enrollement", {
        user_id: userId,   // use o nome correto do campo
        event_id: eventId, // e o nome do evento
        date: date,        // adicione a data aqui
      });
      alert("Inscrição realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao se inscrever no evento:", error);
      alert("Ocorreu um erro ao se inscrever no evento.");
    }
  };
  

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbarsub />

      <div className="p-8 pt-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Meus Eventos</h1>
          <Link
            className="ml-2 px-4 py-2 bg-gradient-to-r from-customRed to-customOrange text-white rounded-lg shadow-md hover:from-customPurple hover:to-customRed transition-all"
            href="/inscricoes"
          >
            Minhas Inscrições
          </Link>
        </div>
        <div className="mb-6">
          <Link
            className="ml-2 px-4 py-2 bg-gradient-to-r from-customRed to-customOrange text-white rounded-lg shadow-md hover:from-customPurple hover:to-customRed transition-all"
            href="/criareventos"
          >
            Criar novo evento
          </Link>
        </div>

        {loadingUserEvents ? (
          <p className="text-gray-600">Carregando seus eventos...</p>
        ) : userEvents.length === 0 ? (
          <p className="text-gray-600">Nenhum evento encontrado.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {userEvents.map((event) => (
              <div
                key={event.id}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-bold text-gray-700">{event.name}</h2>
                <p className="text-gray-600 mt-2">Data: {event.date}</p>
                <p className="text-gray-600">
                  Local: {event.location || "Local não informado"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Todos os Eventos</h1>

        {loadingPublicEvents ? (
          <p className="text-gray-600">Carregando eventos...</p>
        ) : publicEvents.length === 0 ? (
          <p className="text-gray-600">Nenhum evento disponível.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {publicEvents.map((event) => (
              <div
                key={event.id}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-bold text-gray-700">{event.name}</h2>
                <p className="text-gray-600 mt-2">Data: {event.date}</p>
                <p className="text-gray-600">
                  Local: {event.location || "Local não informado"}
                </p>
                <div className="mt-4 flex justify-center">
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-customRed to-customOrange text-white rounded-lg shadow-md hover:from-customPurple hover:to-customRed transition-all"
                    onClick={() => handleSubscribe(event.id)}
                  >
                    Inscrever-se
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
