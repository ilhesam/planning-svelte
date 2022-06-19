import { codegen } from "swagger-axios-codegen";

codegen({
  methodNameMode: "path",
  multipleFileMode: false,
  enumNamePrefix: "Enum",
  useStaticMethod: true,
  serviceNameSuffix: "Service",
  fileName: "index" + ".ts",
  remoteUrl: "http://localhost:13527" + "/swagger/v1/swagger.json",
  outputDir: "./src/services/api",
});