import dynamic from "next/dynamic";
import React from "react";

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});

function Newticket() {
  return <TicketForm />;
}

export default Newticket;
