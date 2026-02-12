import type { MySoCodegenConfig } from "@socialproof/codegen";

const config: MySoCodegenConfig = {
  output: "./src/contracts",
  packages: [
    {
      package: "@local-pkg/counter",
      path: "./move/counter",
    },
  ],
};

export default config;
