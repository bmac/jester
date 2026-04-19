import { join } from "node:path";
import { VCR, FileStorage, DefaultRequestMatcher } from "vcr-test";

export const vcr = new VCR(new FileStorage(join(__dirname, "__cassettes__")));
vcr.requestMasker = (req) => {
  req.headers["authorization"] = "masked";
};

// Match cassettes on URL/method/body only. Header comparison is brittle —
// fetch implementation details (e.g. happy-dom version in user-agent,
// connection/host/content-length) shift across upgrades and break playback.
const matcher = new DefaultRequestMatcher();
matcher.compareHeaders = false;
vcr.matcher = matcher;
