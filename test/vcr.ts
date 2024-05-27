import { join } from "node:path";
import { VCR, FileStorage } from "vcr-test";

export const vcr = new VCR(new FileStorage(join(__dirname, "__cassettes__")));
vcr.requestMasker = (req) => {
  req.headers["authorization"] = "masked";
};
