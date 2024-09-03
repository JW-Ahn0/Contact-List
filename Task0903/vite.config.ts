import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/{Contact-List}/", // {repo-name}을 GitHub 저장소 이름으로 변경
});
