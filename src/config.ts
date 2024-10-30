import * as fs from "fs";
import { normalize } from "path";
import { z } from "zod";

const ConfigObjSchema = z.object({
  port: z.number(),
  user_agent: z.string(),
  client_id: z.string(),
  client_secret: z.string(),
});

let cfg_: z.infer<typeof ConfigObjSchema> | null = null;

function readCfg() {
  const path = normalize(`${__dirname}/../config/config.json`);
  const config = fs.readFileSync(path, "utf8");
  return ConfigObjSchema.parse(JSON.parse(config));
}

export default () => {
  if (!cfg_) {
    cfg_ = readCfg();
  }
  return cfg_;
};
