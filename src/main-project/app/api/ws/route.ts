import type { NextRequest } from "next/server";
import type { RouteContext } from "next-ws/server";
import { WebSocket, type WebSocketServer } from "ws";
import type { Flag } from "@prisma/client";

export function GET() {
  return new Response("Upgrade Required", {
    status: 426,
    headers: { "Content-Type": "text/plain" },
  });
}

type ZoomMessage = {
  isZoomedIn: boolean | number | string;
  planetId: number | null;
};

type FlagsMessage = {
  type: "flags-updated";
  flags: Flag[];
};

type Message = ZoomMessage | FlagsMessage;

const isFlagsMessage = (value: Message): value is FlagsMessage =>
  "type" in value && value.type === "flags-updated";

const toMessage = (value: unknown): Message => {
  if (typeof value === "string") {
    try {
      return toMessage(JSON.parse(value));
    } catch {
      return { isZoomedIn: false, planetId: null };
    }
  }

  if (typeof value === "object" && value !== null) {
    const data = value as Partial<ZoomMessage & FlagsMessage>;

    if (data.type === "flags-updated" && Array.isArray(data.flags)) {
      return {
        type: "flags-updated",
        flags: data.flags,
      };
    }

    const planetId =
      data.planetId === null || data.planetId === undefined
        ? null
        : data.planetId;

    return {
      isZoomedIn: data.isZoomedIn ?? false,
      planetId: planetId,
    };
  }

  return { isZoomedIn: false, planetId: null };
};

export function UPGRADE(
  client: WebSocket,
  server: WebSocketServer,
  _request: NextRequest,
  _context: RouteContext<"/api/ws">,
) {
  client.on("message", (message) => {
    console.log("Received WS message:", message);
    const text =
      typeof message === "string"
        ? message
        : Buffer.isBuffer(message)
          ? message.toString("utf8")
          : Array.isArray(message)
            ? Buffer.concat(message).toString("utf8")
            : new TextDecoder().decode(message);

    const data = toMessage(text);

    if (isFlagsMessage(data)) {
      const payload = JSON.stringify(data);
      server.clients.forEach((peer) => {
        if (peer.readyState === WebSocket.OPEN) {
          peer.send(payload);
        }
      });
      return;
    }

    const isZoomedIn =
      data.isZoomedIn === true || Number(data.isZoomedIn) === 1;
    const payload = JSON.stringify({
      type: "zoom-updated",
      isZoomedIn,
      planetId:
        data.planetId === null || data.planetId === undefined
          ? null
          : data.planetId + 1,
    });
    server.clients.forEach((peer) => {
      if (peer.readyState === WebSocket.OPEN) {
        peer.send(payload);
      }
    });
    // console.log("Received WS message:", data);
  });
}
