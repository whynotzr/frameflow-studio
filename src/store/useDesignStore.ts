import { create } from "zustand";
import type { ColorToken } from "../utils/exporters";

interface DesignState {
  tokens: ColorToken[];
  updateToken: (id: string, value: string) => void;
  addToken: (name: string, value: string) => void;
  removeToken: (id: string) => void;
}

export const useDesignStore = create<DesignState>((set) => ({
  tokens: [
    { id: "1", name: "background", value: "#090B10" },
    { id: "2", name: "surface", value: "#141824" },
    { id: "3", name: "primary", value: "#A855F7" },
    { id: "4", name: "secondary", value: "#38BDF8" },
    { id: "5", name: "foreground", value: "#F8FAFC" }
  ],
  updateToken: (id, value) =>
    set((state) => ({
      tokens: state.tokens.map((t) => (t.id === id ? { ...t, value: value.toUpperCase() } : t))
    })),
  addToken: (name, value) =>
    set((state) => ({
      tokens: [...state.tokens, { id: crypto.randomUUID(), name, value: value.toUpperCase() }]
    })),
  removeToken: (id) =>
    set((state) => ({
      tokens: state.tokens.filter((t) => t.id !== id)
    }))
}));
