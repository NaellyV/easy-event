"use client";

import { useState, useEffect } from "react";
import Navbarsub from "../navbarsub/page";
import Link from "next/link";

interface Invite {
  id: number;
  eventName: string;
  eventDate: string;
  eventLocation: string;
}

export default function ConvitesRecebidos() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { //exemplo
    setTimeout(() => {
      setInvites([
        {
          id: 1,
          eventName: "Workshop de React",
          eventDate: "2025-03-10",
          eventLocation: "Auditório IFMA",
        },
        {
          id: 2,
          eventName: "Encontro de Devs",
          eventDate: "2025-04-05",
          eventLocation: "Espaço Tech Hub",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbarsub />
      <div className="p-8 pt-24">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Convites Recebidos</h1>

        {loading ? (
          <p className="text-gray-600">Carregando convites...</p>
        ) : invites.length === 0 ? (
          <p className="text-gray-600">Nenhum convite recebido.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {invites.map((invite) => (
              <div
                key={invite.id}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-bold text-gray-700">{invite.eventName}</h2>
                <p className="text-gray-600 mt-2">Data: {invite.eventDate}</p>
                <p className="text-gray-600">Local: {invite.eventLocation}</p>
                <div className="mt-4 flex justify-between">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all">
                    Aceitar
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all">
                    Recusar
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