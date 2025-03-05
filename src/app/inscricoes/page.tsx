"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbarsub from "../navbarsub/page";

interface Enrollement {
  id: number;
  event_id: number;
  event: {
    name: string;
    date: string;
    location: string;
  };
}

export default function UserEvents() {
  const [userEnrollements, setUserEnrollements] = useState<Enrollement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    console.log("User ID:", userId); 
  
    if (userId) {
      axios.get(`http://localhost:3333/enrollement/user/${userId}`)
        .then((res) => {
          console.log("Dados retornados pela API:", res.data);
          setUserEnrollements(res.data);
        })
        .catch((err) => {
          console.error("Erro ao carregar inscrições:", err);
        })
        .finally(() => setLoading(false));
    } else {
      console.error("ID do usuário não encontrado no localStorage");
      setLoading(false);
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbarsub />

      <div className="p-8 pt-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Minhas Inscrições</h1>
        </div>

        {loading ? (
          <p className="text-gray-600">Carregando suas inscrições...</p>
        ) : userEnrollements.length === 0 ? (
          <p className="text-gray-600">Você ainda não se inscreveu em nenhum evento.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {userEnrollements.map((enrollement) => (
              <div
                key={enrollement.id}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-bold text-gray-700">{enrollement.event.name}</h2>
                <p className="text-gray-600 mt-2">Data do Evento: {enrollement.event.date}</p>
                <p className="text-gray-600">Local: {enrollement.event.location || "Local não informado"}</p>
               
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
