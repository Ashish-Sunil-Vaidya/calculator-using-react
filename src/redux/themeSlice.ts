import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Accent = "blue" | "green" | "red" | "yellow";
export type AnimClass = "a0" | "a05" | "a1" | "a15" | "a2" | "a25" | "a3";
interface AccentColor {
  color: string;
  accent: Accent;
}
export const accentColors: AccentColor[] = [
  { accent: "blue", color: "#00a0ff" },
  { accent: "green", color: "#00ff6c" },
  { accent: "red", color: "#ff0000" },
  { accent: "yellow", color: "#ffff00" },
];

interface ThemeState {
  theme: "light" | "dark";
  accent: Accent;
  animationSpeedClass: AnimClass;
}

const initialState: ThemeState = {
  theme: "light",
  accent: "blue",
  animationSpeedClass: "a1",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    changeAccent: (state, action: PayloadAction<Accent>) => {
      state.accent = action.payload;
    },
    changeAnimationSpeed: (state, action: PayloadAction<AnimClass>) => {
      state.animationSpeedClass = action.payload;
    },
  },
});

export const { toggleTheme, changeAccent, changeAnimationSpeed } =
  themeSlice.actions;

export default themeSlice.reducer;
